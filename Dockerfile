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

# Copy Vertex AI Key
COPY backend/euphoric-grin-455920-k5-b25a345972e7.json ./euphoric-grin-455920-k5-b25a345972e7.json

# Move frontend build into root /dist (served by backend)
RUN cp -r ./frontend/dist ./dist

# Expose port and run server
EXPOSE 8080
CMD ["node", "backend/server.js"]
