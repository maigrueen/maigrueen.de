# 1. Build-Phase mit Node
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2. Auslieferung mit Nginx
FROM nginx:alpine
# Passe 'dist' an, falls der Build-Ordner anders heißt (z.B. 'build' oder 'public')
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]