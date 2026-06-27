FROM node:18-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./backend/
COPY frontend/ ./frontend/

RUN mkdir -p /app/uploads && chmod 755 /app/uploads

EXPOSE 5000

CMD ["node", "backend/server.js"]