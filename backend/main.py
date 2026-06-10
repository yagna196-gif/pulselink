from fastapi import FastAPI
from database import engine
from models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PulseLink API")


@app.get("/")
def root():
    return {"message": "PulseLink Backend Connected"}