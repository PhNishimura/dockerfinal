# Etapa 1 – Builder (com Node.js)
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Faz o build da aplicação
RUN npm run build

# Etapa 2 – Servidor (Nginx)
FROM nginx:alpine

# Remove a config default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o resultado da build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]