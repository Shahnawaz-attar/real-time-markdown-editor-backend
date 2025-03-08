# Use a minimal Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Expose the port your backend listens on (Render will use this)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]