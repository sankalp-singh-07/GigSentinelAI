from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    DB_URL: str = "postgresql://dummyData/dummyDb"
    JWT_SECRET_KEY: str = "JWT_SECRET_KEY_DUMMY_ONE"
    JWT_REFRESH_SECRET_KEY: str = "JWT_REFRESH_SECRET_KEY_DUMMY_ONE"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 1440
    JWT_REFRESH_EXPIRE_MINUTES: int = 10080
    ENVIRONMENT: str = "development"
    OPENWEATHER_API_KEY: str = "API_KEY_FOR_OPENWEATHER"
    TOMTOM_API_KEY: str = ""


    class Config:
        env_file = ".env"

settings = Settings()