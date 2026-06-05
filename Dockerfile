# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (assuming you have initialized npm in this folder)
RUN npm install

# Copy the rest of the application code
COPY . .

# The command to run your app
CMD ["node", "server.js"]