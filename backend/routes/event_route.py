from fastapi import APIRouter

from schemas.event_schemas import EventResponse
from utils.engine import run_event_engine

router = APIRouter(
    prefix="/event",
    tags=["event"]
)

@router.post("/events", response_model=EventResponse, status_code=201)
async def generate_events(data: dict):
    events = run_event_engine(data)
    return {
        "events": events
    }