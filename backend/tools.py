from database import SessionLocal
from models import Donor


def search_donors(blood_group: str):
    db = SessionLocal()

    donors = (
        db.query(Donor)
        .filter(Donor.blood_group == blood_group)
        .all()
    )

    results = []

    for donor in donors:
        results.append(
            {
                "name": donor.name,
                "blood_group": donor.blood_group,
            }
        )

    db.close()

    return results
