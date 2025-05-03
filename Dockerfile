# Use a slim Node image
FROM node:20-slim

# Set working directory
WORKDIR /app

# --- FRONTEND BUILD ---
# Copy and install frontend deps
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy frontend source and build it
COPY frontend ./frontend
RUN cd frontend && npm run build

# --- BACKEND SETUP ---
# Copy backend deps and install
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend ./backend

# Move frontend build into root /dist (served by backend)
RUN cp -r ./frontend/dist ./dist

# Expose port and run server
EXPOSE 8080
CMD ["node", "backend/server.js"]
