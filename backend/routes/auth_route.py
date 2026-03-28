from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

from schemas.user_schemas import (
    UserRegister, TokenResponse, UserLogin, UserResponse,
    ForgotPasswordRequest, FingerprintLoginRequest, VerifyResetCodeRequest, ResetPasswordRequest
)
from services.auth_service import (
    create_user, login_user, get_current_user, refresh_access_token, 
    fingerprint_login, send_reset_code, verify_reset_code, reset_password
)

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

db_dependency = Annotated[AsyncSession, Depends(get_db)]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/register", status_code=201, response_model=TokenResponse)
async def register(user: UserRegister, db: db_dependency):
    return await create_user(user_data=user, db=db)

@router.post("/login", status_code=201, response_model=TokenResponse)
async def login(user: UserLogin, db: db_dependency):
    return await login_user(user_login=user, db=db)

@router.get("/me", status_code=200, response_model=UserResponse)
async def me(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    return await get_current_user(token=token, db=db)

@router.post("/refresh", status_code=201, response_model=TokenResponse)
async def refresh(refresh_data: FingerprintLoginRequest, db: db_dependency):
    return await refresh_access_token(refresh_token=refresh_data.refresh_token, db=db)

@router.post("/login/fingerprint", status_code=201, response_model=TokenResponse)
async def login_fingerprint(fingerprint_data: FingerprintLoginRequest, db: db_dependency):
    return await fingerprint_login(refresh_token=fingerprint_data.refresh_token, db=db)

@router.post("/forgot-password", status_code=200)
async def forgot_pass(request: ForgotPasswordRequest, db: db_dependency):
    return await send_reset_code(email=request.email, db=db)

@router.post("/verify-reset-code", status_code=200)
async def verify_code(request: VerifyResetCodeRequest, db: db_dependency):
    return await verify_reset_code(verify_data=request, db=db)

@router.post("/reset-password", status_code=200)
async def reset_pass(request: ResetPasswordRequest, db: db_dependency):
    return await reset_password(reset_data=request, db=db)