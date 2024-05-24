from fastapi import FastAPI, Response, status

from database import SessionLocal
from model.health_status import HealthStatus
from service import health_check

from .database import SessionLocal

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.get("/healthcheck", response_model=HealthStatus, status_code=status.HTTP_200_OK)
async def healthcheck(response: Response) -> HealthStatus:
    code, status = health_check.health_check()
    response.status_code = code
    return status
