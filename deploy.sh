#!/bin/bash

echo "🚀 Building and starting production containers..."

# Stop and remove any existing containers
docker compose -f docker-compose.prod.yml down

# Build and start in detached mode
docker compose -f docker-compose.prod.yml up --build -d

echo "✅ Deployment complete. Use the following to view logs:"
echo "   docker compose -f docker-compose.prod.yml logs -f backend"
