# Concord Supplies - Sistema de Papelaria

Sistema simples de gerenciamento de papelaria com backend Node.js/Express e frontend Vue.js.

## 🚀 Como executar com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Executando a aplicação

1. **Clone o repositório e navegue até a pasta:**
   ```bash
   cd docker
   ```

2. **Execute com Docker Compose:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse a aplicação:**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001

### Comandos úteis

```bash
# Parar os containers
docker-compose down

# Reconstruir e executar
docker-compose up --build

# Ver logs
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
```

## 🏗️ Arquitetura

### Backend (Node.js + Express + SQLite)
- **Porta:** 3001
- **Banco:** SQLite (arquivo local)
- **ORM:** Sequelize
- **Rotas:**
  - `GET /` - Health check
  - `GET /health` - Status do banco
  - `GET /users` - Lista usuários
  - `GET /items` - Lista itens de papelaria
  - `GET /purchases` - Lista compras

### Frontend (Vue.js + Vite)
- **Porta:** 8080 (via Nginx)
- **Framework:** Vue 3 + Composition API
- **Build:** Vite
- **Servidor:** Nginx (produção)

## 📊 Dados de Exemplo

O sistema cria automaticamente dados de exemplo:

**Usuários:**
- Mauro Silva (mauro@email.com)
- Ana Costa (ana@email.com)

**Itens:**
- Caderno Universitário - R$ 15,99
- Caneta Azul - R$ 2,50
- Lápis HB - R$ 1,20

**Compras:**
- Mauro comprou 2x Caderno Universitário
- Ana comprou 3x Caneta Azul
- Mauro comprou 5x Lápis HB

## 🔧 Desenvolvimento

Para desenvolvimento local sem Docker:

### Backend
```bash
cd backend
npm install
npm run seed  # Popular banco com dados
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 Estrutura do Projeto

```
docker/
├── backend/
│   ├── models/          # Modelos Sequelize
│   ├── Dockerfile
│   ├── index.js         # Servidor Express
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.vue      # Componente principal
│   │   └── views/
│   ├── Dockerfile
│   ├── nginx.conf       # Configuração Nginx
│   └── package.json
├── docker-compose.yml   # Orquestração Docker
└── README.md
```

## 🐛 Troubleshooting

### Backend não conecta
- Verifique se a porta 3001 está livre
- Veja os logs: `docker-compose logs backend`

### Frontend não carrega dados
- Verifique se o backend está rodando
- Teste a API diretamente: http://localhost:3001/users

### Problemas com Docker
- Limpe containers antigos: `docker-compose down`
- Reconstrua as imagens: `docker-compose up --build`
- Limpe cache do Docker: `docker system prune`