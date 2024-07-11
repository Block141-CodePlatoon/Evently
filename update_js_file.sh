#!/bin/bash

# Get the public IP address from Terraform output
PUBLIC_IP=$(terraform output -raw public_ip)

# File to update
JS_FILE="/Users/bleh/Desktop/CodePlatoon/group-final/NameTBD/frontend/src/axiosSetup.js" # Update with the path to your JS file

# Update the baseURL in the JavaScript file
sed -i "s|baseURL: 'http://localhost:8000/'|baseURL: 'http://${PUBLIC_IP}:8000/'|g" $JS_FILE

echo "Updated $JS_FILE with public IP: $PUBLIC_IP"
