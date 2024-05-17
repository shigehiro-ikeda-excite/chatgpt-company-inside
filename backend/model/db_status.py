from pydantic import BaseModel

from model.status import Status

class DbStatus(BaseModel):
    status: Status