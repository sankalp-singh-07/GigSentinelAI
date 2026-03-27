from pydantic import BaseModel, Field, field_validator, EmailStr
from datetime import datetime
import re

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2)
    password: str = Field(..., min_length=8, description="Password must contain at least one uppercase letter, one digit, and one special character.")
    email: EmailStr
    mobile: str = Field(..., pattern=r"^\+\d{1,3}\d{10}$", description="Mobile number must start with a country code followed by 10 digits")
    dob: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, value):
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"\d", value):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r"[@$!%*?&]", value):
            raise ValueError("Password must contain at least one special character (@, $, !, %, *, ?, or &)")
        return value

    @field_validator('dob')
    @classmethod
    def validate_dob(cls, value):
        for fmt in ('%d/%m/%Y', '%Y-%m-%d'):
            try:
                datetime.strptime(value, fmt)
                return value
            except ValueError:
                pass
        raise ValueError("dob must be in 'DD/MM/YYYY' or 'YYYY-MM-DD' format and be a valid date")

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    message: str
    user: dict
