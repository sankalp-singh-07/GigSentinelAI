from datetime import datetime, timedelta, timezone
from typing import List, Optional

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.policy_model import Policy
from models.user_model import User
from utils.plans import PLANS


VALID_PLAN_TYPES: set[str] = {p["type"] for p in PLANS}


def _find_plan(plan_type: str) -> Optional[dict]:
    return next((p for p in PLANS if p["type"] == plan_type), None)


def _now_utc() -> datetime:
    return datetime.now(timezone.utc)

def get_plans() -> list[dict]:
    return PLANS


async def get_active_policy(user_id: str, db: AsyncSession) -> Optional[Policy]:
    now = _now_utc()
    result = await db.execute(
        select(Policy).where(
            Policy.user_id == user_id,
            Policy.status == "ACTIVE",
            Policy.end_date > now,
        )
    )
    return result.scalars().first()


async def get_my_policy(user: User, db: AsyncSession) -> dict:
    user_id = str(user.id)

    active = await get_active_policy(user_id=user_id, db=db)

    if active:
        return {
            "has_active_policy": True,
            "message": "Active policy found.",
            "policy": active,
        }


    now = _now_utc()
    stale_result = await db.execute(
        select(Policy).where(
            Policy.user_id == user_id,
            Policy.status == "ACTIVE",
            Policy.end_date <= now,
        )
    )
    stale_policies = stale_result.scalars().all()
    if stale_policies:
        for stale in stale_policies:
            stale.status = "EXPIRED"
            db.add(stale)
        await db.commit()

    return {
        "has_active_policy": False,
        "message": "No active policy found. Purchase a new plan to get covered.",
        "policy": None,
    }


async def get_all_policies(user: User, db: AsyncSession) -> dict:
    user_id = str(user.id)
    now = _now_utc()

    result = await db.execute(
        select(Policy)
        .where(Policy.user_id == user_id)
        .order_by(Policy.created_at.desc())
    )
    policies = result.scalars().all()

    dirty = False
    for p in policies:
        if p.status == "ACTIVE" and p.end_date <= now:
            p.status = "EXPIRED"
            db.add(p)
            dirty = True
    if dirty:
        await db.commit()
        for p in policies:
            await db.refresh(p)

    return {
        "total": len(policies),
        "policies": policies,
    }


async def buy_policy(user: User, plan_type: str, db: AsyncSession) -> Policy:
    normalised = plan_type.strip().lower()
    plan = _find_plan(normalised)
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Invalid plan type '{plan_type}'. "
                f"Valid options are: {sorted(VALID_PLAN_TYPES)}."
            ),
        )

    existing = await get_active_policy(user_id=str(user.id), db=db)
    if existing:
        days_left = (existing.end_date.replace(tzinfo=timezone.utc) - _now_utc()).days
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"You already have an active '{existing.plan_type}' policy "
                f"with approximately {days_left} day(s) remaining. "
                "It must expire before you can purchase a new one."
            ),
        )

    now = _now_utc()
    policy = Policy(
        user_id=str(user.id),
        plan_type=plan["type"],
        premium_amount=plan["premium"],
        coverage_amount=plan["coverage"],
        start_date=now,
        end_date=now + timedelta(days=7),
        status="ACTIVE",
    )
    db.add(policy)
    await db.commit()
    await db.refresh(policy)
    return policy
