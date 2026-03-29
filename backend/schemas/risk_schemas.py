from typing import Any, Dict, Optional
from pydantic import BaseModel, Field


class EnvironmentData(BaseModel):
    rain_mm: float = Field(..., description="Rainfall in the last hour (mm)")
    temperature: float = Field(..., description="Current temperature (°C)")
    aqi: int = Field(..., description="Air Quality Index (approx 0–500 scale)")
    traffic_congestion: float = Field(
        ...,
        ge=0.0,
        le=1.0,
    )
    lat: Optional[float] = Field(None, description="Latitude of the city centre")
    lon: Optional[float] = Field(None, description="Longitude of the city centre")


class RiskResponse(BaseModel):
    city: str = Field(..., description="City name as provided by the client")
    risk_score: float = Field(
        ..., ge=0.0, le=1.0, description="Normalised risk score in [0, 1]"
    )
    risk_level: str = Field(
        ..., description="Human-readable level: LOW | MEDIUM | HIGH"
    )
    recommended_plan: str = Field(
        ..., description="Suggested insurance plan: basic | standard | premium"
    )
    environment: Dict[str, Any] = Field(
        ..., description="Raw environment metrics used to compute the score"
    )