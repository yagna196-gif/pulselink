from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import BloodRequest
from schemas import BloodRequestCreate

router = APIRouter(prefix="/requests", tags=["Blood Requests"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_request(request: BloodRequestCreate, db: Session = Depends(get_db)):
    new_request = BloodRequest(
        patient_name=request.patient_name,
        phone=request.phone,
        hospital_address=request.hospital_address,
        blood_group=request.blood_group,
        notes=request.notes,
        status="PENDING",
    )

    db.add(new_request)
    db.commit()
    db.refresh(new_request)

    return {
        "message": "Blood request created successfully",
        "request": new_request
    }


@router.get("/")
def get_requests(db: Session = Depends(get_db)):
    requests = db.query(BloodRequest).all()
    return requests