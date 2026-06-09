# PulseLink Architecture

## System Architecture

Patient/Donor
│
▼
React + Tailwind Frontend
│
▼
FastAPI Backend
│
▼
MySQL Database

## Data Flow

1. Donor registers.
2. Donor data is stored in MySQL.
3. Patient creates blood request.
4. Backend finds matching donors.
5. Matching donors receive notification.
6. Donor accepts request.
7. Patient receives donor contact details.

## Future Integrations

* SMS Gateway
* Hospital Systems
* Location Services
* AI Recommendation Engine
