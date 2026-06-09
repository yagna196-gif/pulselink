# Pulselink Backend POC

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pulselink

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=30d

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Frontend
CORS_ORIGIN=http://localhost:3000

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```bash
mysql -u root -p
CREATE DATABASE pulselink;
```

3. Run migrations:
```bash
npm run migrate
```

4. Start development server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints Summary

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/refresh` - Refresh token

### Donors
- GET `/api/donors` - List all donors
- POST `/api/donors` - Create donor
- GET `/api/donors/:id` - Get donor details
- PUT `/api/donors/:id` - Update donor

### Blood Requests
- POST `/api/requests` - Create request
- GET `/api/requests` - List requests
- GET `/api/requests/:id` - Get request details
- PUT `/api/requests/:id/status` - Update status
- POST `/api/requests/:id/respond` - Respond to request

### SMS
- GET `/api/sms-logs` - View SMS logs

## Testing

Run tests:
```bash
npm test
```

## Database Schema

See `src/database/schema.sql` for the complete MySQL schema.
