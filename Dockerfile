# Use a lightweight Node image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source code
COPY backend ./backend

# Copy prebuilt frontend output
COPY frontend/dist ./dist

# Expose the backend port
EXPOSE 8080

# Run the server
CMD ["node", "backend/server.js"]
