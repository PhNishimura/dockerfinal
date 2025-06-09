FROM node:18-alpine

# Instala curl para healthcheck
RUN apk add --no-cache curl

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Cria diretório para o banco de dados
RUN mkdir -p /app/data

# Expõe a porta
EXPOSE 3001

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]