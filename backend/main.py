from fastapi import FastAPI
from database import engine, SessionLocal
from models import Base, Donor, BloodRequest
from routes import donor, request

Base.metadata.create_all(bind=engine)

app = FastAPI(title="PulseLink API")

app.include_router(donor.router)
app.include_router(request.router)


@app.get("/")
def root():
    return {"message": "PulseLink Backend Connected"}


@app.get("/dashboard")
def dashboard():
    db = SessionLocal()

    try:
        total_donors = db.query(Donor).count()
        total_requests = db.query(BloodRequest).count()
        available_donors = (
            db.query(Donor)
            .filter(Donor.availability_status == True)
            .count()
        )

        return {
            "total_donors": total_donors,
            "total_requests": total_requests,
            "available_donors": available_donors
        }

    finally:
        db.close()