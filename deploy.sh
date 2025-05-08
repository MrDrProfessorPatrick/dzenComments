#!/bin/bash

echo "🔄 Stopping previous containers..."
docker compose -f docker-compose.prod.yml down

echo "🚀 Building images..."
docker compose -f docker-compose.prod.yml build --no-cache

echo "📦 Starting services in detached mode..."
docker compose -f docker-compose.prod.yml up -d

echo "✅ Deployment complete!"
docker compose -f docker-compose.prod.yml ps