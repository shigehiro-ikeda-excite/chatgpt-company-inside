from sqlalchemy import Column, Integer, String
from database import Base

from pydantic import BaseModel

class TestTable(BaseModel):
    __tablename__ = "test_table"

    id = Column(Integer, primary_key=True)
    test_message = Column(String)
