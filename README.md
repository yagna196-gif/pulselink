# 🩸 PulseLink

**PulseLink** is a full-stack web application designed to connect blood donors with patients during emergencies. The platform reduces the time required to find compatible blood donors by matching blood requests with registered donors and notifying eligible donors instantly.

---

## 📌 Problem Statement

During medical emergencies, patients and their families often struggle to find compatible blood donors quickly. Existing methods rely on personal contacts, social media, and manual searching, which can cause life-threatening delays.

---

## 💡 Solution

PulseLink provides a centralized platform where:

* Donors register their blood information.
* Patients create emergency blood requests.
* The system automatically matches compatible donors.
* Eligible donors receive notifications.
* Donors can accept or reject requests.
* Patient and donor contact details are shared after acceptance.

---

## 🚀 Features

### Donor Module

* Register as a blood donor
* Update availability status
* View blood requests
* Accept or reject donation requests

### Patient Module

* Create blood requests
* Track request status
* View accepted donors

### Admin Module

* Manage donors
* Manage blood requests
* Monitor system activity

### Matching Engine

* Blood group matching
* Donor availability verification
* Donation eligibility check
* Automated request processing

---

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* MySQL

### Development Tools

* Git
* GitLab
* VS Code

---

## 📂 Project Structure

```text
Pulselink/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   ├── donor.py
│   │   ├── request.py
│   │   └── auth.py
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── schemas.py
│
├── spec-kit/
│   ├── constitution.md
│   ├── specification.md
│   ├── implementation-plan.md
│   ├── tasks.md
│   └── poc.md
│
├── docs/
│   ├── architecture.md
│   └── database-design.md
│
└── README.md
```

---

## 🗄 Database Schema

### donors

| Field               | Type         |
| ------------------- | ------------ |
| id                  | INT          |
| name                | VARCHAR(100) |
| phone               | VARCHAR(15)  |
| address             | TEXT         |
| blood_group         | VARCHAR(5)   |
| last_donation_date  | DATE         |
| availability_status | VARCHAR(20)  |

### blood_requests

| Field            | Type         |
| ---------------- | ------------ |
| id               | INT          |
| patient_name     | VARCHAR(100) |
| phone            | VARCHAR(15)  |
| hospital_address | TEXT         |
| blood_group      | VARCHAR(5)   |
| notes            | TEXT         |
| status           | VARCHAR(20)  |

### request_responses

| Field           | Type        |
| --------------- | ----------- |
| id              | INT         |
| request_id      | INT         |
| donor_id        | INT         |
| response_status | VARCHAR(20) |

---

## 🔄 Workflow

### Donor Registration

1. Donor registers on the platform.
2. Provides:

   * Name
   * Phone Number
   * Address
   * Blood Group
   * Last Donation Date

### Blood Request Creation

1. Patient creates a blood request.
2. Provides:

   * Patient Name
   * Contact Number
   * Hospital Address
   * Required Blood Group

### Matching Process

1. System finds matching blood group donors.
2. Checks donor availability.
3. Verifies donation eligibility.
4. Sends request notifications.
5. Donors accept or reject requests.
6. Accepted donor details are shared with the patient.

---

## 🎯 MVP Features

* Donor Registration
* Blood Request Creation
* Blood Group Matching
* Donor Acceptance/Rejection
* Request Tracking
* Admin Dashboard

---

## 🔮 Future Enhancements

* SMS Notifications (Fast2SMS/Twilio)
* Location-Based Matching
* Hospital Integration
* Emergency Priority Requests
* Donor Reward System
* AI-Powered Donor Recommendation Engine
* Mobile Application

---

## 📊 Proof of Concept (POC)

The POC demonstrates:

✅ Donor Registration

✅ Blood Request Creation

✅ Blood Group Matching

✅ Donor Acceptance

✅ Contact Sharing

This validates the core functionality of connecting patients with compatible blood donors during emergencies.

---

## ⚙️ Installation

### Backend Setup

```bash
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🌐 Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8000
```

API Documentation:

```text
http://localhost:8000/docs
```

---

## 👨‍💻 Developer

**Project:** PulseLink

**Domain:** Healthcare / MedTech

**Goal:** Save lives by reducing the time required to find blood donors during emergencies.

---

# ❤️ Every Drop Counts. Every Donor Matters.