from pydantic import BaseModel
from datetime import date


# Donor Registration Schema
class DonorCreate(BaseModel):
    name: str
    phone: str
    age: int
    gender: str
    address: str
    blood_group: str
    last_donation_date: date
    availability_status: bool = True


# Blood Request Schema
class BloodRequestCreate(BaseModel):
    patient_name: str
    phone: str
    hospital_address: str
    blood_group: str
    notes: str


# Donor Response Schema
class DonorResponse(BaseModel):
    donor_id: int
    request_id: int
    response_status: str