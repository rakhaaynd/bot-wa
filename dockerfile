# Gunakan Node.js versi terbaru
FROM node:18

# Set work directory
WORKDIR /app

# Salin file ke container
COPY . .

# Install dependencies
RUN npm install

# Jalankan aplikasi
CMD ["npm", "start"]
