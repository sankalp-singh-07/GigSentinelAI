from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.user_model import User
from utils.helpers import create_access_token


async def create_user(
        user_dict: dict,
        db: AsyncSession,
) -> dict:
    
    result = await db.execute(select(User).where(User.email == user_dict["email"]))
    existing_user = result.scalars().first()
    if existing_user:
        raise Exception("Email already registered")

    user = User(
        name=user_dict["name"],
        email=user_dict["email"],
        mobile=user_dict["mobile"],
        dob=user_dict["dob"],
        password=user_dict["password"],
    )

    db.add(user)
    await db.commit()
    await db.refresh(user)

    data = {
        "sub": str(user.id),
        "email": user.email,
    }

    token = await create_access_token(data=data)

    return {
        "access_token": token,
        "token_type": "bearer",
        "message": "User registered successfully",
        "user" : {
            "id" : user.id,
            "name" : user.name,
            "email" : user.email,
            "mobile" : user.mobile,
            "dob" : user.dob
        }
    }
