# Use Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend source
COPY frontend .

# Expose Vite port
EXPOSE 5173

# Start React dev server
CMD ["npm", "run", "dev", "--", "--host"]