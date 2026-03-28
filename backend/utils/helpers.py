from datetime import timedelta, datetime, timezone
from typing import Optional
from jose import jwt

import hashlib
import asyncio
import bcrypt
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from schemas.user_schemas import TokenResponse


def _hash_password_sync(password: str) -> str:
    sha256_hash = hashlib.sha256(password.encode('utf-8')).hexdigest()
    pwd_bytes = sha256_hash.encode('ascii')
    return bcrypt.hashpw(pwd_bytes, bcrypt.gensalt()).decode('ascii')

def _verify_password_sync(plain_password: str, hashed_password: str) -> bool:
    sha256_hash = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
    password_byte_enc = sha256_hash.encode('ascii')
    hashed_password_bytes = hashed_password.encode('ascii')
    return bcrypt.checkpw(password_byte_enc, hashed_password_bytes)

async def hash_password(password: str):
    return await asyncio.to_thread(_hash_password_sync, password)

async def verify_password(plain_password: str, hashed_password: str):
    return await asyncio.to_thread(_verify_password_sync, plain_password, hashed_password)

from fastapi import HTTPException, status
from jose import jwt, JWTError

async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.JWT_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

async def create_refresh_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.JWT_REFRESH_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.JWT_REFRESH_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)

async def verify_access_token(token: str):
    try:
        result = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        if not result or not result.get("sub"):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return result
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

async def verify_refresh_token(token: str):
    try:
        result = jwt.decode(token, settings.JWT_REFRESH_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        if not result or not result.get("sub"):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
        return result
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
