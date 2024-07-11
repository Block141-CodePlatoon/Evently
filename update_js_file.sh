#!/bin/bash

# Get the public IP address from Terraform output
PUBLIC_IP=$(terraform output -raw public_ip)

if [ -z "$PUBLIC_IP" ]; then
  echo "Error: No public IP address found"
  exit 1
fi

# File to update
JS_FILE="/home/ec2-user/Evently/frontend/src/axiosSetup.js" # Update with the path to your JS file

# Ensure the file exists
if [ ! -f "$JS_FILE" ]; then
  echo "Error: JavaScript file not found at $JS_FILE"
  exit 1
fi

# Update the baseURL in the JavaScript file
sed -i "" "s|baseURL: 'http://localhost:8000/'|baseURL: 'http://${PUBLIC_IP}:8000/'|g" "$JS_FILE"

echo "Updated $JS_FILE with public IP: $PUBLIC_IP""
