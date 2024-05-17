from fastapi import FastAPI

from model.health_status import HealthStatus
from service import health_check

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.get("/healthcheck", response_model=HealthStatus)
async def healthcheck() -> HealthStatus:
    return health_check.health_check()
