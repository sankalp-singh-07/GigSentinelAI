from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.user_model import User
from schemas.user_schemas import UserLogin, UserRegister
from utils.helpers import create_access_token, verify_password, hash_password


async def _generate_auth_response(user: User, message: str) -> dict:
    data = {
        "sub": str(user.id),
        "email": user.email,
    }

    token = await create_access_token(data=data)

    return {
        "access_token": token,
        "token_type": "bearer",
        "message": message,
        "user": user
    }


async def create_user(
        user_data: UserRegister,
        db: AsyncSession,
) -> dict:
    
    result = await db.execute(select(User).where(User.email == user_data.email))
    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )

    hashed_password = await hash_password(user_data.password)

    user = User(
        name=user_data.name,
        email=user_data.email,
        mobile=user_data.mobile,
        dob=user_data.dob,
        password=hashed_password,
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    return await _generate_auth_response(user, "User registered successfully")


async def login_user(user_login: UserLogin, db: AsyncSession) -> dict:
    result = await db.execute(select(User).where(User.email == user_login.email))
    data = result.scalars().first()

    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect credentials"
        )

    verify_pwd = await verify_password(
        user_login.password,
        data.password
    )

    if not verify_pwd:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect credentials"
        )

    return await _generate_auth_response(data, "User logged in successfully")