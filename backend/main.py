from fastapi import FastAPI
from database import engine
from models import Base
from routes import donor, request

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PulseLink API")

app.include_router(donor.router)
app.include_router(request.router)


@app.get("/")
def root():
    return {"message": "PulseLink Backend Connected"}