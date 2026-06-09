# Pulselink Frontend POC

React-based frontend for the Pulselink blood donation management system.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## Features

- **Donor Registration**: Register blood donors with their details and blood group
- **Patient Request**: Create urgent blood requests
- **Donor Dashboard**: View and respond to blood requests
- **Authentication**: JWT-based user authentication
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API integration
├── context/            # React Context for state management
├── styles/             # CSS/styling
└── App.js              # Main app component
```

## Pages

- `/` - Home page
- `/login` - User login
- `/register-donor` - Donor registration
- `/donor-dashboard` - View blood requests (protected)
- `/patient-request` - Create blood request (protected)

## API Integration

All API calls are made through the `apiClient` configured in `src/services/api.js` with automatic token injection.
