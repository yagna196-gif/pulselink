from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal
from models import Base, Donor, BloodRequest

from routes.donor import router as donor_router
from routes.request import router as request_router
from routes.agent import router as agent_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PulseLink API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://pulselink-2.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include Routers
app.include_router(donor_router)
app.include_router(request_router)
app.include_router(agent_router)


@app.get("/")
def root():
    return {"message": "PulseLink Backend Connected"}


@app.get("/dashboard")
def dashboard():
    db = SessionLocal()

    donors_count = db.query(Donor).count()
    requests_count = db.query(BloodRequest).count()

    db.close()

    return {"total_donors": donors_count, "total_requests": requests_count}
