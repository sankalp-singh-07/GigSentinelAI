import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from routes import auth_route, policy_route, risk_route
from app.database import engine, Base
import models.user_model
import models.policy_model

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(auth_route.router, prefix="/api")
app.include_router(policy_route.router, prefix="/api")
app.include_router(risk_route.router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "Hello World"}
