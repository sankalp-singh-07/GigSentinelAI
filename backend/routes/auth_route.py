from fastapi import APIRouter, HTTPException, Depends
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db

from schemas.user_schemas import UserRegister, TokenResponse
from utils.helpers import hash_password
from services.auth_service import create_user

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
    try:
        hashed_password = await hash_password(user.password)
        
        user_dict = user.model_dump()
        user_dict["password"] = hashed_password

        response_data = await create_user(user_dict=user_dict, db=db)
        
        return response_data

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not register user: {str(e)}")
