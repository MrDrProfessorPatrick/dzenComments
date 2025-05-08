To lauch dzenchat app locally with docker-compose.yml file execute command:

    - sudo ./deploy.sh 

it will execute these commands: 

"Stopping previous containers..."
docker compose -f docker-compose.yml down

"Building images..."
docker compose -f docker-compose.yml build --no-cache

"Starting services in detached mode..."
docker compose -f docker-compose.yml up -d

"Deployment complete!"
docker compose -f docker-compose.yml ps


App is laucned on http://localhost:5173/