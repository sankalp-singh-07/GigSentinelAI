from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

from schemas.user_schemas import UserRegister, TokenResponse, UserLogin
from services.auth_service import create_user, login_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

db_dependency = Annotated[AsyncSession, Depends(get_db)]

@router.post("/register", status_code=201, response_model=TokenResponse)
async def register(
        user: UserRegister,
        db: db_dependency
):
    return await create_user(user_data=user, db=db)


@router.post("/login", status_code=201, response_model=TokenResponse)
async def login(
        user: UserLogin,
        db: db_dependency
):
    return await login_user(user_login=user, db=db)
