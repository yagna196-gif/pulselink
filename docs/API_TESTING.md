# Pulselink - Testing Guide & API Documentation

## API Test Examples

### 1. Donor Registration

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "password": "SecurePass123",
    "role": "DONOR",
    "address": "123 Blood Bank Road",
    "city": "Delhi",
    "state": "Delhi",
    "bloodGroup": "O+"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "DONOR"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 2. Patient Blood Request

**Request:**
```bash
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "bloodGroup": "O+",
    "quantityNeeded": 3,
    "priority": "CRITICAL",
    "hospitalName": "Apollo Hospital",
    "hospitalAddress": "Delhi, India",
    "hospitalPhone": "+911140123456",
    "notes": "Emergency surgery required"
  }'
```

**Response:**
```json
{
  "message": "Blood request created and SMS sent to 5 matching donors",
  "request": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "bloodGroup": "O+",
    "quantityNeeded": 3,
    "status": "SMS_SENT",
    "donorCount": 5
  }
}
```

### 3. Donor Response to Request

**Request:**
```bash
curl -X POST http://localhost:5000/api/requests/660e8400-e29b-41d4-a716-446655440001/respond \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer DONOR_ACCESS_TOKEN" \
  -d '{
    "status": "ACCEPTED",
    "reason": null
  }'
```

**Response:**
```json
{
  "message": "Response recorded",
  "response": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "status": "ACCEPTED"
  }
}
```

### 4. Get All Blood Requests

**Request:**
```bash
curl -X GET "http://localhost:5000/api/requests?status=SMS_SENT&limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Response:**
```json
{
  "requests": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "bloodGroup": "O+",
      "quantityNeeded": 3,
      "priority": "CRITICAL",
      "hospitalName": "Apollo Hospital",
      "status": "SMS_SENT",
      "patient": {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "name": "Patient Name",
        "phone": "+919876543210"
      }
    }
  ],
  "total": 1
}
```

### 5. Get Donors by Blood Group

**Request:**
```bash
curl -X GET "http://localhost:5000/api/donors?bloodGroup=O%2B&isAvailable=true" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Response:**
```json
{
  "donors": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440004",
      "userId": "550e8400-e29b-41d4-a716-446655440000",
      "totalDonations": 5,
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "John Doe",
        "phone": "+919876543210",
        "bloodGroup": "O+"
      }
    }
  ],
  "total": 1
}
```

## Manual Testing Checklist

### Donor Flow
- [ ] Register as donor
- [ ] Login with donor credentials
- [ ] Receive blood request SMS (in app simulation)
- [ ] Accept blood request
- [ ] View acceptance confirmation
- [ ] Check donor dashboard

### Patient Flow
- [ ] Register as patient
- [ ] Login with patient credentials
- [ ] Create blood request
- [ ] Verify SMS is sent to donors
- [ ] Receive donor response notification
- [ ] Mark donation as completed

### Admin Flow
- [ ] Login as admin
- [ ] View all donors
- [ ] View all blood requests
- [ ] View SMS logs
- [ ] View analytics

## Database Queries for Testing

### View all donors
```sql
SELECT u.name, u.bloodGroup, u.phone, d.totalDonations 
FROM users u 
JOIN donors d ON u.id = d.userId 
WHERE u.isActive = true;
```

### View pending requests
```sql
SELECT br.*, u.name as patient_name 
FROM blood_requests br 
JOIN users u ON br.patientId = u.id 
WHERE br.status != 'COMPLETED';
```

### View SMS delivery status
```sql
SELECT requestId, status, count(*) as count 
FROM sms_logs 
GROUP BY requestId, status;
```

## Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Missing required fields | Check request body for all required fields |
| 401 | Invalid credentials | Verify email and password |
| 401 | Access token required | Include Authorization header with Bearer token |
| 403 | Insufficient permissions | User role doesn't have permission for this action |
| 404 | User not found | Verify user ID |
| 500 | Internal server error | Check server logs for details |

## Performance Metrics to Track

- Average SMS delivery time: Target < 5 seconds
- Average donor response time: Target < 5 minutes
- Request acceptance rate: Target > 60%
- System uptime: Target > 99.5%
- Average API response time: Target < 500ms

## SMS Integration Testing

For testing without actual Twilio account:
1. Use Twilio's test credentials
2. Check SMS logs in database instead of actual SMS delivery
3. Mock SMS service in unit tests

---

**For more information, see SPECIFICATION.md**
