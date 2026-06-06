# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# To leverage Docker cache, copy the package files first
COPY package*.json ./

# Also copy the workspace structure so npm install can find the nested package.json files
COPY services/api-gateway/package*.json ./services/api-gateway/
COPY services/auth-service/package*.json ./services/auth-service/
COPY services/email-service/package*.json ./services/email-service/
COPY services/event-planing-and-booking_service/package*.json ./services/event-planing-and-booking_service/
COPY services/external-payment-api/package*.json ./services/external-payment-api/
COPY services/room_booking-service/package*.json ./services/room_booking-service/

# Install dependencies for the root and all workspaces
RUN npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 10000 && \
    npm install --verbose

# Copy the rest of the application code
COPY . .

# Let docker-compose override the CMD for each microservice
CMD ["node", "server.js"]
