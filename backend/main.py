from fastapi import FastAPI, Response, status
import mysql.connector

from model.health_status import HealthStatus
from service import health_check
from pydantic import BaseModel
from typing import List
from fastapi import FastAPI, Response, status
from model.health_status import HealthStatus
from service import health_check

app = FastAPI()

class Message(BaseModel):
    id: int
    conversation_id: int
    text: str
    role: str

# Connect to MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="chat-gpt-clone",
    password="chat-gpt-clone",
    database="app"
)

@app.get("/")
async def root():
    return {"message": "Hello World!"}

@app.get("/healthcheck", response_model=HealthStatus, status_code=status.HTTP_200_OK)
async def healthcheck(response: Response) -> HealthStatus:
    code, status = health_check.health_check()
    response.status_code = code
    return status

@app.post("/messages", status_code=status.HTTP_201_CREATED)
async def create_message(message: Message, response: Response):
    # Create a cursor object to execute SQL queries
    cursor = mydb.cursor()

    # Insert the message into the database
    sql = "INSERT INTO messages (id, conversation_id, text, role) VALUES (%s, %s, %s, %s)"
    val = (message.id, message.conversation_id, message.text, message.role)
    cursor.execute(sql, val)
    mydb.commit()

    # Set the response status code
    response.status_code = status.HTTP_201_CREATED

    return {"message": "Message created successfully"}

@app.get("/messages", response_model=List[Message], status_code=status.HTTP_200_OK)
async def get_messages():
    # Create a cursor object to execute SQL queries
    cursor = mydb.cursor()

    # Retrieve all messages from the database
    cursor.execute("SELECT * FROM messages")
    result = cursor.fetchall()

    # Convert the result into a list of Message objects
    messages = []
    for row in result:
        message = Message(id=row[0], conversation_id=row[1], text=row[2], role=row[3])
        messages.append(message)

    return messages
