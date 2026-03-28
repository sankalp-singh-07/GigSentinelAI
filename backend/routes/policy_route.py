from typing import Annotated, List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from models.user_model import User
from schemas.policy_schemas import (
    ActivePolicyResponse,
    PlanResponse,
    PolicyCreate,
    PolicyListResponse,
    PolicyResponse,
)
from services.auth_service import get_current_user
from services.policy_service import buy_policy, get_all_policies, get_my_policy, get_plans

router = APIRouter(prefix="/policy", tags=["policy"])

DbDep = Annotated[AsyncSession, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


@router.get("/plans", status_code=200, response_model=List[PlanResponse])
async def list_plans():
    return get_plans()


@router.post("/buy-policy", status_code=201, response_model=PolicyResponse)
async def purchase_policy(body: PolicyCreate, current_user: CurrentUser, db: DbDep):
    return await buy_policy(user=current_user, plan_type=body.plan_type, db=db)


@router.get("/my-policy", status_code=200, response_model=ActivePolicyResponse)
async def my_policy(current_user: CurrentUser, db: DbDep):
    return await get_my_policy(user=current_user, db=db)


@router.get("/policies", status_code=200, response_model=PolicyListResponse)
async def all_policies(current_user: CurrentUser, db: DbDep):
    return await get_all_policies(user=current_user, db=db)
