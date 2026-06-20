from fastapi import APIRouter
from agents.blood_agent import PulseLinkAgent

router = APIRouter()

agent = PulseLinkAgent()


@router.get("/agent")
def agent_status():
    return {"status": "PulseLink Agent Active"}


@router.get("/agent/search")
def search(blood_group: str):
    return agent.find_donors(blood_group)