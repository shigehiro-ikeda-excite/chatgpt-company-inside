from sqlalchemy import create_engine, Column, Integer, DateTime, Text, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "mysql://appuser:LtbPJLRDA7vixT5n@localhost:3306/app"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Define your table models here
class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    started_at = Column(DateTime, nullable=False)
    from sqlalchemy import Column, Integer, DateTime, Text, String, ForeignKey
    ended_at = Column(DateTime)

class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, autoincrement=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False)
    text = Column(Text, nullable=False)
    role = Column(String(50), nullable=False)
    created_at = Column(DateTime, nullable=False)

# Create the tables
Base.metadata.create_all(bind=engine)
