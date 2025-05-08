# Build Frontend
FROM node:23.11.0-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Build Backend
FROM node:23.11.0-alpine AS backend
WORKDIR /app
COPY ./server/package*.json ./
RUN npm ci
COPY ./server ./
COPY --from=frontend /app/dist ./public

WORKDIR /app/server
COPY ./server/prisma ./prisma

# Production image with Nginx
FROM node:23.11.0-alpine
RUN apk add --no-cache nginx

WORKDIR /app

COPY --from=frontend /app/dist /usr/share/nginx/html
COPY --from=backend /app /app
COPY nginx.conf /etc/nginx/nginx.conf

RUN npx prisma generate

# Run backend on port 3000 using Node.js
EXPOSE 80 3000
CMD ["sh", "-c", "node server.js & nginx -g 'daemon off;'"]
