from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from models.user_model import User
from schemas.user_schemas import (
    FingerprintLoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserLogin,
    UserRegister,
    UserResponse,
    VerifyResetCodeRequest,
)
from services.auth_service import (
    create_user,
    fingerprint_login,
    get_current_user,
    login_user,
    refresh_access_token,
    reset_password,
    send_reset_code,
    verify_reset_code,
)

router = APIRouter(prefix="/auth", tags=["auth"])

DbDep = Annotated[AsyncSession, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


@router.post("/register", status_code=201, response_model=TokenResponse)
async def register(user: UserRegister, db: DbDep):
    return await create_user(user_data=user, db=db)


@router.post("/login", status_code=200, response_model=TokenResponse)
async def login(user: UserLogin, db: DbDep):
    return await login_user(user_login=user, db=db)


@router.get("/me", status_code=200, response_model=UserResponse)
async def me(current_user: CurrentUser):
    return current_user


@router.post("/refresh", status_code=200, response_model=TokenResponse)
async def refresh(refresh_data: FingerprintLoginRequest, db: DbDep):
    return await refresh_access_token(refresh_token=refresh_data.refresh_token, db=db)


@router.post("/login/fingerprint", status_code=200, response_model=TokenResponse)
async def login_fingerprint(fingerprint_data: FingerprintLoginRequest, db: DbDep):
    return await fingerprint_login(refresh_token=fingerprint_data.refresh_token, db=db)


@router.post("/forgot-password", status_code=200)
async def forgot_password(request: ForgotPasswordRequest, db: DbDep):
    return await send_reset_code(email=request.email, db=db)


@router.post("/verify-reset-code", status_code=200)
async def verify_code(request: VerifyResetCodeRequest, db: DbDep):
    return await verify_reset_code(verify_data=request, db=db)


@router.post("/reset-password", status_code=200)
async def reset_pass(request: ResetPasswordRequest, db: DbDep):
    return await reset_password(reset_data=request, db=db)