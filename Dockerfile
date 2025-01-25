# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Clean install dependencies with legacy peer deps support
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"] 