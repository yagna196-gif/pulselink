# AGENTS.md

## Project Name

PulseLink - Emergency Blood Donor Network

## Project Overview

PulseLink is a full-stack web application that connects patients requiring blood with compatible blood donors during emergencies. The platform helps reduce the time required to find eligible donors through automated donor matching and notifications.

## Technology Stack

### Frontend

* React
* Tailwind CSS
* Axios
* React Router

### Backend

* FastAPI
* SQLAlchemy
* Pydantic

### Database

* MySQL

### Version Control

* GitLab

---

## Agent Responsibilities

### Frontend Agent

Responsible for:

* Landing Page
* Donor Registration UI
* Blood Request UI
* Dashboard UI
* API Integration
* Form Validation
* Responsive Design

Folders:

```text
frontend/
```

---

### Backend Agent

Responsible for:

* FastAPI Setup
* Database Models
* API Development
* Business Logic
* Donor Matching Logic
* Database Integration

Folders:

```text
backend/
```

---

## Development Rules

1. Follow project structure.
2. Write reusable code.
3. Use meaningful commit messages.
4. Test before pushing.
5. Do not commit secrets or passwords.
6. Keep API documentation updated.

---

## Branch Strategy

```text
main
│
├── frontend
├── backend
└── feature/*
```

---

## API Standards

* Use REST APIs.
* Return JSON responses.
* Use proper HTTP status codes.
* Validate all incoming data.

---

## Future Agents

Possible future agents:

* SMS Notification Agent
* AI Recommendation Agent
* Hospital Integration Agent
* Location Matching Agent
