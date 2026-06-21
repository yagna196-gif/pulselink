from fastapi import APIRouter
from tools import search_donors

router = APIRouter()


@router.get("/agent")
def agent_status():
    return {"status": "PulseLink ADK Agent Active"}


@router.get("/agent/search")
def search(blood_group: str):
    return search_donors(blood_group)