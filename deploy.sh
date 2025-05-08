#!/bin/bash

echo "🔄 Stopping previous containers..."
docker compose -f docker-compose.yml down

echo "🚀 Building images..."
docker compose -f docker-compose.yml build --no-cache

echo "📦 Starting services in detached mode..."
docker compose -f docker-compose.yml up -d

echo "✅ Deployment complete!"
docker compose -f docker-compose.yml ps
