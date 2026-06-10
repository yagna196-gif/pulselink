from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Donor
from schemas import DonorCreate

router = APIRouter(prefix="/donors", tags=["Donors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register_donor(donor: DonorCreate, db: Session = Depends(get_db)):
    new_donor = Donor(
        name=donor.name,
        phone=donor.phone,
        age=donor.age,
        gender=donor.gender,
        address=donor.address,
        blood_group=donor.blood_group,
        last_donation_date=donor.last_donation_date,
        availability_status=donor.availability_status,
    )

    db.add(new_donor)
    db.commit()
    db.refresh(new_donor)

    return {
        "message": "Donor registered successfully",
        "donor": new_donor
    }


@router.get("/")
def get_donors(db: Session = Depends(get_db)):
    donors = db.query(Donor).all()
    return donors