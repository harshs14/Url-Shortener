import models
from fastapi import FastAPI
from sqlalchemy.orm import Session
from database import SessionLocal, engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# @app.post("/api/url_shortener")
# def url_shortener():
