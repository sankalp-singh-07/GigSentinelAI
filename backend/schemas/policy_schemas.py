from datetime import datetime

from pydantic import BaseModel


class PlanResponse(BaseModel):
    type: str
    premium: int
    coverage: int


class PolicyCreate(BaseModel):
    plan_type: str


class PolicyResponse(BaseModel):
    id: int
    plan_type: str
    premium_amount: int
    coverage_amount: int
    start_date: datetime
    end_date: datetime
    status: str

    class Config:
        from_attributes = True