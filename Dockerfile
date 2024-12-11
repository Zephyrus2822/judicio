# Use an official Node.js runtime as a parent image
FROM node:lts-bookworm-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the container - source and destination path same 
COPY . . 

# Build the React application
RUN npm run build

# Use a lightweight web server to serve the React application
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container has been started
CMD ["nginx", "-g", "daemon off;"]
