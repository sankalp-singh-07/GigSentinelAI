from pydantic import BaseModel
from typing import List

class Event(BaseModel):
    type: str
    severity: str
    message: str

class EventResponse(BaseModel):
    events: List[Event]