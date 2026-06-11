from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import BloodRequest, Donor
from schemas import BloodRequestCreate

router = APIRouter(prefix="/requests", tags=["Blood Requests"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def send_notification(phone, blood_group, hospital_address):
    print(
        f"SMS sent to {phone}: Emergency {blood_group} blood needed at {hospital_address}"
    )


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

    matching_donors = db.query(Donor).filter(
        Donor.blood_group == request.blood_group,
        Donor.availability_status == True
    ).all()

    for donor in matching_donors:
        send_notification(
            donor.phone,
            request.blood_group,
            request.hospital_address
        )

    return {
        "message": "Blood request created successfully",
        "request": new_request,
        "matching_donors": matching_donors,
        "notifications_sent": len(matching_donors)
    }


@router.get("/")
def get_requests(db: Session = Depends(get_db)):
    requests = db.query(BloodRequest).all()
    return requests


@router.get("/match/{blood_group}")
def get_matching_donors(
    blood_group: str,
    db: Session = Depends(get_db)
):
    donors = db.query(Donor).filter(
        Donor.blood_group == blood_group,
        Donor.availability_status == True
    ).all()

    return donors