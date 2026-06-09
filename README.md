# Pulselink - Blood Donation Management System

## POC (Proof of Concept) - Complete Setup Guide

This is a **Proof of Concept** for Pulselink, an emergency blood donation management system that connects donors with patients in real-time via SMS.

### Project Structure

```
Pulselink/
├── docs/                          # Documentation
│   └── SPECIFICATION.md           # Complete system specification
├── backend/                       # Node.js/Express API
│   ├── src/
│   │   ├── models/               # Database models
│   │   ├── controllers/          # Business logic
│   │   ├── routes/               # API endpoints
│   │   ├── services/             # Service layer
│   │   ├── middlewares/          # Auth & validation
│   │   ├── utils/                # Utilities
│   │   ├── config/               # Database & external services
│   │   └── server.js             # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── frontend/                      # React application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Page components
│   │   ├── services/             # API client
│   │   ├── context/              # State management
│   │   ├── styles/               # Styling
│   │   ├── App.js                # Main app
│   │   └── index.js              # Entry point
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── README.md
└── README.md                      # This file
```

### Quick Start

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your configuration
# - Database credentials
# - Twilio credentials (for SMS)
# - JWT secrets

# Start development server
npm run dev
```

Server will run on `http://localhost:5000`

#### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

Frontend will run on `http://localhost:3000`

### Key Features Implemented

✅ **Donor Registration**
- Register with name, phone, address, blood group, donation history

✅ **Patient Blood Requests**
- Create urgent blood requests with hospital details
- Automatic SMS broadcast to matching donors

✅ **Donor Response System**
- Receive SMS notifications for blood requests
- Accept/decline requests instantly

✅ **Request Tracking**
- Real-time status updates (CREATED → SMS_SENT → ACCEPTED → COMPLETED)
- SMS logging for audit trail

✅ **Authentication**
- JWT-based authentication
- Role-based access control (DONOR, PATIENT, ADMIN)

✅ **Database Models**
- Users, Donors, Blood Requests, Request Responses, SMS Logs

### API Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token

**Donors**
- `GET /api/donors` - List donors (admin)
- `POST /api/donors` - Register donor
- `GET /api/donors/:id` - Get donor details
- `PUT /api/donors/:id` - Update donor profile

**Blood Requests**
- `POST /api/requests` - Create blood request
- `GET /api/requests` - List requests with filters
- `GET /api/requests/:id` - Get request details
- `PUT /api/requests/:id/status` - Update request status
- `POST /api/requests/:id/respond` - Donor responds to request

**SMS**
- `GET /api/sms/logs` - View SMS logs (admin)

### Database Requirements

MySQL database with the following tables (auto-created by Sequelize):
- `users` - User accounts
- `donors` - Donor-specific information
- `blood_requests` - Blood request records
- `request_responses` - Donor responses to requests
- `sms_logs` - SMS delivery logs

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pulselink
JWT_SECRET=your_secret_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890
CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Next Steps (Future Development)

1. **Phase 2: MVP**
   - Advanced donor search and filtering
   - Donation history tracking
   - Admin analytics dashboard
   - Email notifications
   - Unit tests and integration tests

2. **Phase 3: Beta**
   - Mobile app (React Native/Flutter)
   - Real-time notifications using WebSockets
   - Geolocation-based donor search
   - Payment integration (if monetized)
   - Hospital management portal

3. **Phase 4: Production**
   - Load testing and optimization
   - Security audit and compliance (HIPAA/GDPR)
   - Multi-region deployment
   - Advanced analytics and reporting
   - Disaster recovery plan

### Testing

**Backend**
```bash
cd backend
npm test
```

**Frontend**
```bash
cd frontend
npm test
```

### Deployment

### Docker Setup (Optional)

```bash
# Build and run with Docker Compose
docker-compose up
```

### Documentation

- See [SPECIFICATION.md](docs/SPECIFICATION.md) for complete system specification
- See [backend/README.md](backend/README.md) for backend details
- See [frontend/README.md](frontend/README.md) for frontend details

### Support & Contact

For questions or issues:
1. Check the specification document
2. Review the README files in each directory
3. Check API response errors for detailed error messages

### License

MIT License - See LICENSE file for details

---

**Version:** 0.1.0 (POC)  
**Last Updated:** June 9, 2026  
**Status:** Proof of Concept - Ready for Testing
