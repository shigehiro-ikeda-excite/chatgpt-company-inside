from model.db_status import DbStatus
from model.health_status import HealthStatus
from model.redis_status import RedisStatus
from model.status import Status

def health_check() -> HealthStatus:
    redis_status = RedisStatus(status=Status.NG)
    
    db_status = DbStatus(status=Status.NG)
    healthcheck = HealthStatus(status="NG", redis=redis_status, db=db_status)
    return healthcheck