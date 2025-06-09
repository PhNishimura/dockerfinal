# Etapa 1 – Builder (com Node.js)
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Etapa 2 – Servidor (Nginx)
FROM nginx:alpine

# Remove a config default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o resultado da build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia um nginx.conf personalizado, se existir
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

