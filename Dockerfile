# Desarrollo: Vite en 0.0.0.0:5173 (el comando puede sobreescribirse en docker-compose).
FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
