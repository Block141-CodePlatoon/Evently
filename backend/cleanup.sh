#!/bin/bash
#run with caution this will destroy all of your docker stuff
# Stop all running containers
echo "Stopping all running containers..."
sudo docker stop $(sudo docker ps -aq)

# Remove all containers
echo "Removing all containers..."
sudo docker rm $(sudo docker ps -aq)

# Remove all images
echo "Removing all images..."
sudo docker rmi $(sudo docker images -q)

# Remove all volumes
echo "Removing all volumes..."
sudo docker volume rm $(sudo docker volume ls -q)

# Remove all networks
echo "Removing all networks..."
sudo docker network rm $(sudo docker network ls -q)

# Remove build cache
echo "Removing build cache..."
sudo docker builder prune -a -f

echo "Docker cleanup completed!"
