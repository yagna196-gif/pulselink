# Pulselink Architecture Guide

## System Design Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐   │
│  │  Donor Mobile    │  │  Patient Web     │  │  Admin Web   │   │
│  │  (React App)     │  │  (React App)     │  │  Dashboard   │   │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘   │
│           │                     │                   │            │
│           └─────────────────────┼───────────────────┘            │
│                                 │ HTTPS/REST                     │
├─────────────────────────────────────────────────────────────────┤
│                      API GATEWAY LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│                    Node.js/Express Server                        │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Middleware Stack                                         │  │
│  │  ├─ Authentication (JWT)                                 │  │
│  │  ├─ Authorization (Role-based)                           │  │
│  │  ├─ Input Validation                                     │  │
│  │  ├─ Rate Limiting                                        │  │
│  │  └─ Error Handling                                       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────┬─────────┬──────────┬─────────────┬────────┐         │
│  │ Auth   │ Donor   │ Request  │ SMS Service │ Admin  │         │
│  │Routes  │Routes   │Routes    │Routes       │Routes  │         │
│  └────┬───┴─────┬───┴────┬─────┴──────┬──────┴────┬───┘         │
│       │         │        │            │           │              │
│  ┌────┴────┬────┴──┬─────┴───┬─────────┴──┬───────┴──┐          │
│  │Auth     │Donor  │Request  │SMS         │Analytics │          │
│  │Control  │Control│Control  │Control     │Control   │          │
│  └─────────┴───────┴─────────┴────────────┴──────────┘          │
├─────────────────────────────────────────────────────────────────┤
│                    SERVICE LAYER                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐           │
│  │ JWT Service  │  │SMS Service   │  │ Query Utils │           │
│  └──────────────┘  └──────────────┘  └─────────────┘           │
├─────────────────────────────────────────────────────────────────┤
│                    DATA ACCESS LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  Sequelize ORM                                                   │
│  ├─ User Model                                                  │
│  ├─ Donor Model                                                 │
│  ├─ BloodRequest Model                                          │
│  ├─ RequestResponse Model                                       │
│  └─ SmsLog Model                                                │
├─────────────────────────────────────────────────────────────────┤
│                    DATABASE LAYER                                 │
├─────────────────────────────────────────────────────────────────┤
│  MySQL Database                                                  │
│  ├─ users table                                                 │
│  ├─ donors table                                                │
│  ├─ blood_requests table                                        │
│  ├─ request_responses table                                     │
│  └─ sms_logs table                                              │
├─────────────────────────────────────────────────────────────────┤
│                  EXTERNAL SERVICES                                │
├─────────────────────────────────────────────────────────────────┤
│  Twilio SMS API ─────────────────────────────────────────────→  │
│  (Real-time SMS delivery to donors)                             │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagrams

### 1. Blood Request Creation & SMS Broadcast

```
Patient/Hospital
      │
      │ Creates blood request
      ↓
API: POST /api/requests
      │
      ↓
RequestController.createRequest()
      │
      ├─ Create BloodRequest record
      │
      ├─ Get matching donors by blood group
      │
      └─ For each matching donor:
         ├─ Compose SMS message
         ├─ Send via Twilio
         └─ Log SMS in database
      │
      ↓
Response: {status: 'SMS_SENT', donorCount: N}
```

### 2. Donor Response Flow

```
Donor (via SMS or App)
      │
      │ Responds to request
      ↓
API: POST /api/requests/{id}/respond
      │
      ↓
RequestController.respondToRequest()
      │
      ├─ Create RequestResponse record
      │
      ├─ If ACCEPTED:
      │  ├─ Update request.status = 'ACCEPTED'
      │  └─ Send confirmation SMS to patient
      │
      └─ If DECLINED:
         └─ Log decline reason
      │
      ↓
Response: {status: 'success', response: {id, status}}
```

### 3. Authentication Flow

```
User Registration/Login
      │
      ├─ POST /api/auth/register
      │    │
      │    ├─ Hash password
      │    ├─ Create User record
      │    ├─ If DONOR: Create Donor record
      │    └─ Generate JWT tokens
      │
      └─ POST /api/auth/login
           │
           ├─ Find user by email
           ├─ Compare password
           └─ Generate JWT tokens
           │
           ↓
Response: {user, accessToken, refreshToken}
      │
      ↓
Client stores tokens in localStorage
      │
      ↓
Subsequent requests include:
Authorization: Bearer {accessToken}
```

## Component Interactions

### Database Relations

```
users (1) ──────────┬─────────── (1) donors
                    │
                    ├─────────── (N) blood_requests
                    └─────────── (N) request_responses

blood_requests (1) ──────────── (N) request_responses
                   │
                   └─────────── (N) sms_logs

request_responses (1) ─────────── (1) donors
```

## Request Lifecycle

```
CREATED (Initial state)
  ↓
SMS_SENT (SMS broadcast to donors)
  ↓
ACCEPTED (At least one donor accepted)
  ↓
COMPLETED (Blood donation completed)
  ├─ OR
  └─ CANCELLED (Request cancelled)

SMS_SENT
  │
  ├─ If time expires (7 days) → Auto-cancel
  └─ If multiple acceptances → Allow donor selection
```

## Security Architecture

```
┌─────────────────────────────────────┐
│      HTTPS/TLS Encryption           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Request Validation & Sanitization│
│    - Input validation (Joi)         │
│    - XSS protection (Helmet)        │
│    - CORS validation                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Authentication (JWT Token)       │
│    - Bearer token required          │
│    - Token expiration (7 days)      │
│    - Refresh token mechanism        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Authorization (Role-Based)       │
│    - DONOR, PATIENT, ADMIN          │
│    - Resource-level access control  │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Rate Limiting                    │
│    - 100 req/15min per IP           │
│    - Prevents abuse & DoS           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Database & Password Security     │
│    - Bcrypt password hashing        │
│    - SQL injection prevention       │
│    - Prepared statements (Sequelize)│
└─────────────────────────────────────┘
```

## Deployment Architecture (Production)

```
┌──────────────────────────────────────────────────┐
│              CDN (Static Assets)                  │
└────────────────────┬─────────────────────────────┘
                     │
┌──────────────────────────────────────────────────┐
│           Load Balancer (Nginx/HAProxy)           │
└────────────┬────────────────────────┬─────────────┘
             │                        │
    ┌────────┴────────┐        ┌─────┴──────────┐
    │                 │        │                │
┌───┴──────┐    ┌─────┴──┐ ┌──┴──────┐    ┌────┴───────┐
│ API      │    │  API   │ │  API    │    │   API      │
│ Server 1 │    │Server 2│ │ Server3 │    │  Server 4  │
└──────────┘    └────────┘ └─────────┘    └────────────┘
    │                │           │            │
    └────────────────┴───────────┴────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
    ┌───┴────┐           ┌───────┴───┐
    │ MySQL  │           │  Redis    │
    │ Master │           │  (Cache)  │
    └──┬─────┘           └───────────┘
       │
   ┌───┴───────────┐
   │  Read Replica │
   └───────────────┘

External:
  ├─ Twilio SMS API
  ├─ Logging (CloudWatch/ELK)
  └─ Monitoring (Prometheus/Grafana)
```

---

**Architecture Version:** 1.0  
**Last Updated:** June 9, 2026
