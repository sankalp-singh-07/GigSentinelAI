from fastapi import APIRouter, Query
from schemas.risk_schema import RiskResponse
from services.risk_service import get_risk_analysis

router = APIRouter(prefix="/risk", tags=["risk"])


@router.get(
    "/score",
    response_model=RiskResponse,
)
async def risk_score(
    city: str = Query(
        ...,
        min_length=1,
        max_length=100
    ),
) -> RiskResponse:
    result = await get_risk_analysis(city)
    return RiskResponse(**result)