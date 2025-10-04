# Multi-stage build for production
FROM node:18-alpine AS frontend-build

# Build frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ .
ENV REACT_APP_API_URL=/api
RUN npm run build

# Backend stage
FROM node:18-alpine AS backend-build

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built backend
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/package.json ./

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./public

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"]