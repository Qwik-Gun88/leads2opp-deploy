# Use slim Node image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy only backend package files and install deps
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend ./backend

# Copy static frontend files into /dist
COPY frontend/dist ./dist

# Expose port and run
EXPOSE 8080
CMD ["node", "backend/server.js"]
