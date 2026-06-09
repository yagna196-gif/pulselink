# Pulselink - Blood Donation Management System
## Specification Document (v1.0)

---

## 1. Executive Summary

**Pulselink** is an emergency blood donation management system that connects blood donors with patients in need. It reduces the critical delay in finding blood during emergencies through a real-time SMS-based request and response system.

**Problem Statement:** During medical emergencies, hospitals struggle to quickly find compatible blood donors, leading to life-threatening delays.

**Solution:** Pulselink enables instant donor-patient matching based on blood group, with SMS notifications for rapid donor response.

---

## 2. Core Features

### 2.1 Donor Registration
Donors register once with the following information:
- **Full Name** (required)
- **Phone Number** (required, used for SMS notifications)
- **Address** (required, for emergency identification)
- **Blood Group** (required: A+, A-, B+, B-, AB+, AB-, O+, O-)
- **Previous Donation Date** (optional, for tracking donation history)
- **Email** (optional, for alternative notifications)
- **Medical Conditions** (optional, for eligibility screening)

### 2.2 Patient Request Creation
When a patient needs blood, they create a request with:
- **Patient Name** (required)
- **Address** (required)
- **Phone Number** (required)
- **Blood Group Needed** (required)
- **Quantity** (required, in units)
- **Emergency Priority** (CRITICAL, HIGH, NORMAL)
- **Hospital/Facility Name** (required)
- **Preferred Contact Person** (name and phone)

### 2.3 Request Broadcasting
- Pulselink automatically sends SMS requests to all registered donors with matching blood group
- SMS includes:
  - Blood group needed
  - Emergency level
  - Patient contact information
  - Location/address
  - Request ID for tracking

### 2.4 Donor Response
Donors can:
- **Accept** request and confirm availability to donate
- **Decline** request and specify reason (if desired)
- **View** all active requests via mobile app/web portal
- **Track** their donation history

### 2.5 Request Tracking
- Real-time status updates: CREATED → SMS_SENT → ACCEPTED → COMPLETED/CANCELLED
- Hospital confirms when blood is received
- Automatic archival of requests after 30 days

---

## 3. User Roles & Workflows

### 3.1 Donor Workflow
```
1. Register on Pulselink (one-time)
2. Receive SMS when blood needed (matching blood group)
3. Review request details (patient info, location, urgency)
4. Accept or Decline
5. If accepted:
   - Contact patient/hospital
   - Complete donation
   - Update donation history
```

### 3.2 Patient/Hospital Workflow
```
1. Create blood request
2. Specify blood group and quantity needed
3. Pulselink broadcasts to matching donors via SMS
4. Wait for donor responses
5. Confirm when donor found
6. Update request status when blood received
7. Mark request as completed
```

### 3.3 Admin Workflow
```
1. View all active requests
2. View donor database
3. Generate reports (donations, response times)
4. Manage system users
5. Configure SMS templates
6. Monitor system health
```

---

## 4. Technical Architecture

### 4.1 Tech Stack
- **Backend:** Node.js + Express.js
- **Frontend:** React.js
- **Database:** MySQL
- **SMS Service:** Twilio
- **Authentication:** JWT tokens
- **Hosting:** (To be decided - AWS/Heroku/DigitalOcean)

### 4.2 System Components
```
┌─────────────────────────────────────────────────────┐
│                   Pulselink System                   │
├─────────────────────────────────────────────────────┤
│  Frontend Layer (React)                             │
│  ├─ Donor Registration Portal                      │
│  ├─ Patient Request Portal                         │
│  ├─ Admin Dashboard                                │
│  └─ Real-time Notifications                        │
├─────────────────────────────────────────────────────┤
│  Backend API (Node.js/Express)                      │
│  ├─ Authentication & Authorization                  │
│  ├─ Donor Management APIs                           │
│  ├─ Request Management APIs                         │
│  ├─ SMS Integration (Twilio)                        │
│  ├─ Notification Service                            │
│  └─ Analytics & Reporting                           │
├─────────────────────────────────────────────────────┤
│  Data Layer                                          │
│  ├─ MySQL Database                                  │
│  ├─ Redis Cache (optional, for performance)         │
│  └─ File Storage (for documents/reports)            │
├─────────────────────────────────────────────────────┤
│  External Services                                  │
│  └─ Twilio SMS Gateway                             │
└─────────────────────────────────────────────────────┘
```

---

## 5. Database Schema

### 5.1 Users Table
```sql
users
├─ id (PK)
├─ name
├─ email
├─ phone
├─ password_hash
├─ role (DONOR, PATIENT, ADMIN)
├─ address
├─ city
├─ state
├─ country
├─ blood_group
├─ created_at
└─ updated_at
```

### 5.2 Donors Table
```sql
donors
├─ id (PK)
├─ user_id (FK)
├─ last_donation_date
├─ total_donations
├─ medical_conditions
├─ is_active
├─ created_at
└─ updated_at
```

### 5.3 Blood Requests Table
```sql
blood_requests
├─ id (PK)
├─ patient_id (FK)
├─ blood_group
├─ quantity_needed
├─ priority (CRITICAL, HIGH, NORMAL)
├─ hospital_name
├─ status (CREATED, SMS_SENT, ACCEPTED, COMPLETED, CANCELLED)
├─ created_at
├─ expires_at (auto-set to 7 days)
└─ updated_at
```

### 5.4 Request Responses Table
```sql
request_responses
├─ id (PK)
├─ request_id (FK)
├─ donor_id (FK)
├─ response_status (ACCEPTED, DECLINED)
├─ response_reason
├─ contacted_at
├─ donation_completed_at
├─ created_at
└─ updated_at
```

### 5.5 SMS Logs Table
```sql
sms_logs
├─ id (PK)
├─ request_id (FK)
├─ donor_id (FK)
├─ phone_number
├─ message_content
├─ status (SENT, FAILED, DELIVERED)
├─ twilio_message_id
├─ created_at
└─ updated_at
```

---

## 6. API Endpoints

### 6.1 Authentication
- `POST /api/auth/register` - Register new user (donor/patient)
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token

### 6.2 Donor Management
- `GET /api/donors` - List all active donors (admin only)
- `GET /api/donors/:id` - Get donor details
- `PUT /api/donors/:id` - Update donor profile
- `DELETE /api/donors/:id` - Deactivate donor account
- `GET /api/donors/by-blood-group/:group` - Get donors by blood group

### 6.3 Blood Request Management
- `POST /api/requests` - Create new blood request
- `GET /api/requests` - List requests (with filters)
- `GET /api/requests/:id` - Get request details
- `PUT /api/requests/:id` - Update request
- `DELETE /api/requests/:id` - Cancel request
- `PUT /api/requests/:id/status` - Update request status

### 6.4 Request Response
- `POST /api/requests/:id/respond` - Donor responds to request (ACCEPT/DECLINE)
- `GET /api/requests/:id/responses` - Get all responses to a request
- `GET /api/donors/:id/responses` - Get donor's response history

### 6.5 Analytics
- `GET /api/analytics/donors-by-blood-group` - Donor statistics
- `GET /api/analytics/request-stats` - Request completion statistics
- `GET /api/analytics/response-time` - Average response time metrics
- `GET /api/analytics/sms-delivery` - SMS delivery statistics

---

## 7. SMS Template Examples

### SMS to Donor
```
🩸 PULSELINK URGENT
Blood needed: {BLOOD_GROUP}
Patient: {PATIENT_NAME}
Location: {ADDRESS}
Priority: {PRIORITY}
Reply: ACCEPT {REQUEST_ID} or visit app
```

### SMS Confirmation
```
✅ Thank you! Your donation accepted.
Hospital: {HOSPITAL_NAME}
Date: {DONATION_DATE}
Contact: {CONTACT_PHONE}
```

---

## 8. Security Considerations

- **Authentication:** JWT-based with refresh tokens
- **Data Encryption:** SSL/TLS for all communications
- **Phone Verification:** OTP verification for donor registration
- **Privacy:** HIPAA/GDPR compliance for patient data
- **Rate Limiting:** API rate limiting to prevent abuse
- **Input Validation:** Server-side validation for all inputs
- **Audit Logs:** Track all critical operations

---

## 9. Scalability & Performance

- **Caching:** Redis for frequently accessed donor lists by blood group
- **Database Indexing:** On blood_group, status, created_at for fast queries
- **Async Processing:** Queue-based SMS dispatch for high volume
- **CDN:** For static frontend assets
- **Load Balancing:** For API servers (horizontal scaling)

---

## 10. Deployment & DevOps

- **Version Control:** Git (GitHub/GitLab)
- **CI/CD:** GitHub Actions / GitLab CI
- **Containerization:** Docker
- **Orchestration:** Docker Compose (dev), Kubernetes (prod)
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack (Elasticsearch, Logstash, Kibana)

---

## 11. Milestones

| Phase | Timeline | Deliverables |
|-------|----------|--------------|
| **Phase 1: POC** | Week 1-2 | Basic APIs, SMS integration, simple UI |
| **Phase 2: MVP** | Week 3-4 | Complete features, user authentication, testing |
| **Phase 3: Beta** | Week 5-6 | Admin dashboard, analytics, performance optimization |
| **Phase 4: Production** | Week 7-8 | Deployment, monitoring, documentation |

---

## 12. Success Metrics

- Average SMS-to-Response time: < 5 minutes
- Donor response rate: > 60%
- Request fulfillment rate: > 80%
- System uptime: > 99.5%
- User satisfaction: > 4.5/5

---

**Document Version:** 1.0  
**Last Updated:** June 9, 2026  
**Status:** Specification Phase
