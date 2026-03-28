import logging
from typing import Any, Dict, Optional

import httpx

from app.config import settings

logger = logging.getLogger(__name__)

_OWM_BASE_URL = "https://api.openweathermap.org/data/2.5"
_TOMTOM_URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"
_TIMEOUT = httpx.Timeout(5.0, connect=3.0)

async def _get_weather_data(city: str) -> Dict[str, Any]:
    params = {
        "q": city,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric",
    }
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        try:
            response = await client.get(f"{_OWM_BASE_URL}/weather", params=params)
            response.raise_for_status()
            return response.json()
        except httpx.TimeoutException as exc:
            logger.error("Weather API timed out for city=%s: %s", city, exc)
            raise
        except httpx.HTTPStatusError as exc:
            logger.error(
                "Weather API returned %s for city=%s: %s",
                exc.response.status_code, city, exc.response.text,
            )
            raise


async def _get_aqi_data(lat: float, lon: float) -> Dict[str, Any]:
    params = {
        "lat": lat,
        "lon": lon,
        "appid": settings.OPENWEATHER_API_KEY,
    }
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        try:
            response = await client.get(f"{_OWM_BASE_URL}/air_pollution", params=params)
            response.raise_for_status()
            return response.json()
        except httpx.TimeoutException as exc:
            logger.error("AQI API timed out for lat=%s lon=%s: %s", lat, lon, exc)
            raise
        except httpx.HTTPStatusError as exc:
            logger.error(
                "AQI API returned %s for lat=%s lon=%s: %s",
                exc.response.status_code, lat, lon, exc.response.text,
            )
            raise


async def _get_traffic_data(lat: float, lon: float) -> Dict[str, Any]:
    if not settings.TOMTOM_API_KEY:
        raise ValueError("TOMTOM_API_KEY is not configured.")
    params = {
        "key": settings.TOMTOM_API_KEY,
        "point": f"{lat},{lon}",
    }
    async with httpx.AsyncClient(timeout=_TIMEOUT) as client:
        try:
            response = await client.get(_TOMTOM_URL, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.TimeoutException as exc:
            logger.error("Traffic API timed out for lat=%s lon=%s: %s", lat, lon, exc)
            raise
        except httpx.HTTPStatusError as exc:
            logger.error(
                "Traffic API returned %s for lat=%s lon=%s: %s",
                exc.response.status_code, lat, lon, exc.response.text,
            )
            raise

def _extract_environment_data(
    weather: Dict[str, Any],
    aqi: Dict[str, Any],
    traffic: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    rain_mm: float = weather.get("rain", {}).get("1h", 0.0)
    temperature: float = weather["main"]["temp"]
    lat: float = weather["coord"]["lat"]
    lon: float = weather["coord"]["lon"]

    aqi_value: int = aqi["list"][0]["main"]["aqi"] * 100

    traffic_congestion: float = 0.3
    if traffic is not None:
        segment = traffic.get("flowSegmentData", {})
        current_speed = float(segment.get("currentSpeed", 0))
        free_flow_speed = float(segment.get("freeFlowSpeed", 1))
        if free_flow_speed > 0:
            traffic_congestion = _clamp(1.0 - (current_speed / free_flow_speed))

    return {
        "rain_mm": rain_mm,
        "temperature": temperature,
        "aqi": aqi_value,
        "traffic_congestion": traffic_congestion,
        "lat": lat,
        "lon": lon,
    }


def _clamp(value: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, value))


def _calculate_risk_score(env: Dict[str, Any]) -> float:
    rain_factor     = _clamp(env["rain_mm"] / 80.0)
    aqi_factor      = _clamp(env["aqi"] / 400.0)
    temp_factor     = _clamp((env["temperature"] - 20.0) / 25.0)
    traffic_factor  = _clamp(env.get("traffic_congestion", 0.3))

    score = (
        rain_factor    * 0.35
        + aqi_factor   * 0.25
        + temp_factor  * 0.10
        + traffic_factor * 0.15
    )
    return round(score, 2)


def _get_risk_level(score: float) -> str:
    if score < 0.3:
        return "LOW"
    if score < 0.6:
        return "MEDIUM"
    return "HIGH"


def _get_recommended_plan(level: str) -> str:
    return {"LOW": "basic", "MEDIUM": "standard", "HIGH": "premium"}.get(level, "premium")


def _fallback_environment(
    lat: Optional[float] = None,
    lon: Optional[float] = None,
) -> Dict[str, Any]:
    return {
        "rain_mm": 0.0,
        "temperature": 30.0,
        "aqi": 150,
        "traffic_congestion": 0.3,
        "lat": lat,
        "lon": lon,
    }

async def get_risk_analysis(city: str) -> Dict[str, Any]:

    lat: float | None = None
    lon: float | None = None

    try:
        weather = await _get_weather_data(city)
        lat = weather["coord"]["lat"]
        lon = weather["coord"]["lon"]
    except Exception as exc:
        logger.error("Weather fetch failed for city=%r - full fallback. Error: %s", city, exc)
        return _build_response(city, _fallback_environment())

    aqi_data: Dict[str, Any] | None = None
    try:
        aqi_data = await _get_aqi_data(lat, lon)
    except Exception as exc:
        logger.warning("AQI fetch failed for city=%r - AQI fallback. Error: %s", city, exc)

    traffic_data: Dict[str, Any] | None = None
    try:
        traffic_data = await _get_traffic_data(lat, lon)
    except ValueError:
        logger.debug("TOMTOM_API_KEY not set; traffic_congestion defaulting to 0.3.")
    except Exception as exc:
        logger.warning("Traffic fetch failed for city=%r - traffic fallback. Error: %s", city, exc)

    if aqi_data is not None:
        env_data: Dict[str, Any] = _extract_environment_data(weather, aqi_data, traffic=traffic_data)
    else:
        rain_mm: float = weather.get("rain", {}).get("1h", 0.0)
        temperature: float = weather["main"]["temp"]
        traffic_congestion: float = 0.3

        if traffic_data is not None:
            segment = traffic_data.get("flowSegmentData", {})
            current_speed = float(segment.get("currentSpeed", 0))
            free_flow_speed = float(segment.get("freeFlowSpeed", 1))
            if free_flow_speed > 0:
                traffic_congestion = max(0.0, min(1.0, 1.0 - current_speed / free_flow_speed))

        env_data = {
            "rain_mm": rain_mm,
            "temperature": temperature,
            "aqi": 150,
            "traffic_congestion": traffic_congestion,
            "lat": lat,
            "lon": lon,
        }

    return _build_response(city, env_data)


def _build_response(city: str, env_data: Dict[str, Any]) -> Dict[str, Any]:
    score = _calculate_risk_score(env_data)
    level = _get_risk_level(score)
    plan  = _get_recommended_plan(level)
    return {
        "city": city,
        "risk_score": score,
        "risk_level": level,
        "recommended_plan": plan,
        "environment": env_data,
    }