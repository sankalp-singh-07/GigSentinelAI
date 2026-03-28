from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.policy_model import Policy
from models.user_model import User
from utils.plans import PLANS


def _find_plan(plan_type: str) -> Optional[dict]:
    """Return plan dict matching plan_type, or None."""
    return next((p for p in PLANS if p["type"] == plan_type), None)


def get_plans() -> list[dict]:
    return PLANS


async def get_active_policy(user_id: str, db: AsyncSession) -> Optional[Policy]:
    """Return the user's current ACTIVE policy that has not yet expired."""
    now = datetime.now(timezone.utc)
    result = await db.execute(
        select(Policy).where(
            Policy.user_id == user_id,
            Policy.status == "ACTIVE",
            Policy.end_date > now,
        )
    )
    return result.scalars().first()


async def buy_policy(user: User, plan_type: str, db: AsyncSession) -> Policy:
    plan = _find_plan(plan_type)
    if not plan:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid plan type '{plan_type}'. Choose from: {[p['type'] for p in PLANS]}.",
        )

    existing = await get_active_policy(user_id=str(user.id), db=db)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You already have an active policy. It must expire before purchasing a new one.",
        )

    now = datetime.now(timezone.utc)
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


async def get_my_policy(user: User, db: AsyncSession) -> Policy:
    """Return the user's most recent policy (any status)."""
    result = await db.execute(
        select(Policy)
        .where(Policy.user_id == str(user.id))
        .order_by(Policy.created_at.desc())
    )
    policy = result.scalars().first()
    if not policy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No policy found for this user.",
        )
    return policy
