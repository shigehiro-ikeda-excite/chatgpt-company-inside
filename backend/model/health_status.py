from pydantic import BaseModel

from model.db_status import DbStatus
from model.redis_status import RedisStatus

class HealthStatus(BaseModel):
    status: str
    redis: RedisStatus
    db: DbStatus
    