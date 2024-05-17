from pydantic import BaseModel

from model.status import Status

class RedisStatus(BaseModel):
    status: Status
