from sqlalchemy import Column, Integer, String, Date, Boolean, Text, ForeignKey
from database import Base


class Donor(Base):
    __tablename__ = "donors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    age = Column(Integer)
    gender = Column(String(20))
    address = Column(Text)
    blood_group = Column(String(5), nullable=False)
    last_donation_date = Column(Date)
    availability_status = Column(Boolean, default=True)


class BloodRequest(Base):
    __tablename__ = "blood_requests"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    hospital_address = Column(Text)
    blood_group = Column(String(5), nullable=False)
    notes = Column(Text)
    status = Column(String(20), default="PENDING")


class RequestResponse(Base):
    __tablename__ = "request_responses"

    id = Column(Integer, primary_key=True, index=True)
    donor_id = Column(Integer, ForeignKey("donors.id"))
    request_id = Column(Integer, ForeignKey("blood_requests.id"))
    response_status = Column(String(20))
