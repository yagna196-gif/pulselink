# Pulselink - Deployment Guide

## Prerequisites

- Node.js 14+
- MySQL 5.7+
- Twilio account (for SMS)
- Docker (optional)
- PM2 or similar process manager (for production)

## Development Deployment

### Local Development

1. **Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Backend runs on `http://localhost:5000`

2. **Frontend**
```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## Production Deployment

### Option 1: Traditional Deployment

#### Backend Deployment (Linux Server)

```bash
# 1. SSH into your server
ssh user@your-server.com

# 2. Clone repository
git clone https://github.com/your-org/pulselink.git
cd pulselink/backend

# 3. Install dependencies
npm install --production

# 4. Create .env with production values
nano .env

# 5. Install PM2
npm install -g pm2

# 6. Start application
pm2 start src/server.js --name "pulselink-api"
pm2 startup
pm2 save
```

#### Frontend Deployment

```bash
cd ../frontend

# 1. Build for production
npm run build

# 2. Create NGINX config
sudo nano /etc/nginx/sites-available/pulselink

# 3. Configure NGINX
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/pulselink/frontend/build;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}

# 4. Enable site
sudo ln -s /etc/nginx/sites-available/pulselink /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 5. SSL Certificate (Let's Encrypt)
sudo certbot --nginx -d your-domain.com
```

### Option 2: Docker Deployment

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      - DB_HOST=mysql
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_NAME}
      - JWT_SECRET=${JWT_SECRET}
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
      - TWILIO_PHONE_NUMBER=${TWILIO_PHONE_NUMBER}
    ports:
      - "5000:5000"
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:5000/api
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  mysql_data:
```

#### Deploy with Docker

```bash
# Build and start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Option 3: Cloud Deployment (AWS)

#### Using Elastic Beanstalk

```bash
# 1. Install AWS CLI and EB CLI
pip install awsebcli

# 2. Initialize Elastic Beanstalk
eb init -p nodejs-14 pulselink --region us-east-1

# 3. Create environment
eb create pulselink-prod

# 4. Deploy
eb deploy

# 5. Monitor
eb logs
```

#### Using RDS for Database

```bash
# 1. Create RDS MySQL instance
aws rds create-db-instance \
  --db-instance-identifier pulselink-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password <PASSWORD>

# 2. Update .env with RDS endpoint
# DB_HOST=pulselink-db.xxxxx.rds.amazonaws.com
```

### Option 4: Heroku Deployment

#### Backend

```bash
# 1. Create Heroku app
heroku create pulselink-api

# 2. Add MySQL addon (using JawsDB or ClearDB)
heroku addons:create jawsdb:kitefin

# 3. Deploy
git push heroku main

# 4. View logs
heroku logs --tail
```

#### Frontend

```bash
# 1. Create Heroku app
heroku create pulselink-client

# 2. Set buildpack
heroku buildpacks:set heroku/nodejs

# 3. Set environment variables
heroku config:set REACT_APP_API_URL=https://pulselink-api.herokuapp.com/api

# 4. Deploy
git push heroku main
```

## Production Configuration Checklist

### Security
- [ ] Change all default passwords and secrets
- [ ] Enable HTTPS/SSL certificates
- [ ] Configure firewall rules
- [ ] Enable database encryption
- [ ] Set up regular backups
- [ ] Enable audit logging
- [ ] Configure rate limiting
- [ ] Enable CORS for production domain only

### Performance
- [ ] Enable database connection pooling
- [ ] Configure Redis cache
- [ ] Enable CDN for static assets
- [ ] Configure load balancing
- [ ] Enable compression (gzip)
- [ ] Set up monitoring and alerts

### Operations
- [ ] Configure log aggregation (CloudWatch, ELK Stack)
- [ ] Set up monitoring (Prometheus, Datadog)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Configure auto-scaling
- [ ] Set up health checks
- [ ] Document runbooks

### Database
- [ ] Run migrations
- [ ] Create database indexes
- [ ] Set up replication/failover
- [ ] Configure automated backups
- [ ] Test backup restoration

## Monitoring & Maintenance

### Application Monitoring

```bash
# Using PM2 Monitor
pm2 install pm2-auto-pull
pm2 monitor

# Using New Relic
npm install newrelic
NODE_OPTIONS=-r newrelic npm start
```

### Log Monitoring

```bash
# Tail logs
pm2 logs pulselink-api

# Archive old logs
pm2 logrotate
```

### Database Maintenance

```sql
-- Optimize tables
OPTIMIZE TABLE users, donors, blood_requests, request_responses, sms_logs;

-- Check for errors
CHECK TABLE users, donors, blood_requests, request_responses, sms_logs;

-- Analyze table structure
ANALYZE TABLE users, donors, blood_requests, request_responses, sms_logs;
```

### Health Checks

Implement health check endpoint:

```bash
curl http://your-server/health
# Response: {"status":"OK","timestamp":"2026-06-09T..."}
```

## Disaster Recovery

### Backup Strategy

```bash
# Daily automated backups
0 2 * * * mysqldump -u root -p${DB_PASSWORD} ${DB_NAME} | gzip > /backups/db_$(date +%Y%m%d).sql.gz

# Weekly full backups to S3
0 3 * * 0 aws s3 cp /backups/ s3://pulselink-backups/ --recursive
```

### Restoration

```bash
# Restore from backup
gunzip < /backups/db_20260609.sql.gz | mysql -u root -p ${DB_NAME}
```

## Performance Optimization

### Database Indexes

```sql
-- Create indexes for common queries
CREATE INDEX idx_blood_group ON users(bloodGroup);
CREATE INDEX idx_request_status ON blood_requests(status);
CREATE INDEX idx_request_created ON blood_requests(createdAt);
CREATE INDEX idx_sms_status ON sms_logs(status);
```

### Caching Strategy

```javascript
// Redis caching for donor lists
const donors = await redis.get(`donors_${bloodGroup}`);
if (!donors) {
  // Fetch from DB and cache
}
```

## Scaling

### Horizontal Scaling

- Use load balancer (NGINX, HAProxy)
- Multiple API instances
- Database read replicas
- Distributed caching

### Vertical Scaling

- Upgrade server resources (CPU, RAM)
- Optimize database queries
- Enable compression
- Enable caching

---

**Version:** 1.0  
**Last Updated:** June 9, 2026
