import random
from fastapi import HTTPException, status
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.user_model import User
from schemas.user_schemas import UserLogin, UserRegister, VerifyResetCodeRequest, ResetPasswordRequest
from utils.helpers import (
    create_access_token, 
    create_refresh_token, 
    verify_password, 
    hash_password, 
    verify_access_token, 
    verify_refresh_token
)

async def _get_user(db: AsyncSession, **kwargs) -> User | None:
    result = await db.execute(select(User).filter_by(**kwargs))
    return result.scalars().first()

async def _generate_auth_response(user: User, message: str) -> dict:
    data = {"sub": str(user.id), "email": user.email}
    access_token = await create_access_token(data=data)
    refresh_token = await create_refresh_token(data=data)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "message": message,
        "user": user
    }

async def create_user(user_data: UserRegister, db: AsyncSession) -> dict:
    if await _get_user(db, email=user_data.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    hashed_password = await hash_password(user_data.password)
    user = User(
        name=user_data.name, email=user_data.email, mobile=user_data.mobile,
        dob=user_data.dob, password=hashed_password,
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)
    return await _generate_auth_response(user, "User registered successfully")

async def login_user(user_login: UserLogin, db: AsyncSession) -> dict:
    data = await _get_user(db, email=user_login.email)
    if data is None or not await verify_password(user_login.password, data.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")
    return await _generate_auth_response(data, "User logged in successfully")

async def get_current_user(token: str, db: AsyncSession) -> User:
    access_token_data = await verify_access_token(token)
    user = await _get_user(db, id=access_token_data.get('sub'))
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='No user found')
    return user

async def refresh_access_token(refresh_token: str, db: AsyncSession) -> dict:
    token_data = await verify_refresh_token(refresh_token)
    data = await _get_user(db, id=token_data.get('sub'))
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return await _generate_auth_response(data, "Token refreshed successfully")

async def fingerprint_login(refresh_token: str, db: AsyncSession) -> dict:
    return await refresh_access_token(refresh_token, db)

async def send_reset_code(email: EmailStr, db: AsyncSession) -> dict:
    user = await _get_user(db, email=email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
    code = f"{random.randint(100000, 999999)}"
    user.reset_code = code
    db.add(user)
    await db.commit()
    
    return {"message": "Reset code generated.", "reset_code_for_testing": code}

async def verify_reset_code(verify_data: VerifyResetCodeRequest, db: AsyncSession) -> dict:
    user = await _get_user(db, email=verify_data.email)
    if not user or user.reset_code != verify_data.reset_code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid or expired reset code")
    
    return {"message": "Reset code verified successfully."}

async def reset_password(reset_data: ResetPasswordRequest, db: AsyncSession) -> dict:
    user = await _get_user(db, email=reset_data.email)
    if not user or user.reset_code != reset_data.reset_code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid reset transaction. Please restart flow.")
        
    user.password = await hash_password(reset_data.new_password)
    user.reset_code = None
    db.add(user)
    await db.commit()
    
    return {"message": "Password has been successfully updated. You can now login."}
