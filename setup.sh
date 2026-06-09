#!/bin/bash

# Pulselink Quick Start Script
# This script sets up the entire Pulselink system

set -e

echo "🩸 Pulselink - Quick Setup Script"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found. Please install Node.js 14+${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm not found. Please install npm${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Check MySQL
if ! command -v mysql &> /dev/null; then
    echo -e "${YELLOW}⚠ MySQL not found. Make sure MySQL is installed and running${NC}"
else
    echo -e "${GREEN}✓ MySQL found${NC}"
fi

echo ""
echo "📁 Setting up project structure..."

# Create directories if they don't exist
mkdir -p backend frontend

# Backend setup
echo ""
echo "🔧 Setting up Backend..."

cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Backend dependencies already installed${NC}"
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=pulselink
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_pulselink_2024
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your_refresh_token_secret_pulselink
JWT_REFRESH_EXPIRE=30d
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
CORS_ORIGIN=http://localhost:3000
EOF
    echo -e "${YELLOW}⚠ .env created. Please update with your credentials${NC}"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

cd ..

# Frontend setup
echo ""
echo "🎨 Setting up Frontend..."

cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
    echo -e "${GREEN}✓ Frontend .env created${NC}"
else
    echo -e "${GREEN}✓ Frontend .env exists${NC}"
fi

cd ..

echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. 📦 Database Setup:"
echo "   • Make sure MySQL is running"
echo "   • The database will be auto-created on first run"
echo ""
echo "2. 🔐 Twilio Setup (for SMS):"
echo "   • Get credentials from: https://www.twilio.com/"
echo "   • Update TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER in backend/.env"
echo ""
echo "3. 🚀 Start the servers:"
echo ""
echo "   Terminal 1 - Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "   Terminal 2 - Frontend:"
echo "   cd frontend && npm start"
echo ""
echo "4. 🌐 Access the application:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend API: http://localhost:5000/api"
echo ""
echo "📚 For more information, see:"
echo "   • docs/SPECIFICATION.md - Complete specification"
echo "   • docs/ARCHITECTURE.md - System architecture"
echo "   • docs/API_TESTING.md - API testing guide"
echo "   • backend/README.md - Backend documentation"
echo "   • frontend/README.md - Frontend documentation"
echo ""
echo -e "${GREEN}Happy coding! 🩸${NC}"
