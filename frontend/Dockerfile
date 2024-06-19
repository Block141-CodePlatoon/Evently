# Dockerfile for React
FROM node:16-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Build the app
COPY . /app/
RUN npm run build

# Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
