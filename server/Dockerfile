# Backend Dockerfile
FROM node:23.11.0-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Run migrations and seed in entrypoint.sh (recommended)
CMD ["node", "server.js"]
