import express from "express";
import cors from "cors";
import { sequelize, User, Item, Purchase } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://frontend:80'],
  credentials: true
}));
app.use(express.json());

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rota raiz para health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend Concord Supplies está rodando!", 
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// Rota para verificar status do banco
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ 
      status: "OK", 
      database: "Connected",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: "ERROR", 
      database: "Disconnected",
      error: error.message 
    });
  }
});

// Rotas da API
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ 
      include: {
        model: Purchase,
        include: [Item]
      }
    });
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    console.error("Erro ao buscar itens:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ 
      include: [
        { model: User },
        { model: Item }
      ]
    });
    res.json(purchases);
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    res.status(500).json({ error: error.message });
  }
});

// Middleware para rotas não encontradas
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Rota não encontrada",
    availableRoutes: ["/", "/health", "/users", "/items", "/purchases"]
  });
});

// Middleware para tratamento de erros
app.use((error, req, res, next) => {
  console.error("Erro interno:", error);
  res.status(500).json({ 
    error: "Erro interno do servidor",
    message: error.message 
  });
});

// Função para inicializar o servidor
async function startServer() {
  try {
    // Sincroniza o banco de dados
    await sequelize.sync();
    console.log("✅ Banco de dados sincronizado");
    
    // Verifica se existem dados, se não, cria dados iniciais
    const userCount = await User.count();
    if (userCount === 0) {
      console.log("📦 Criando dados iniciais...");
      
      // Criar usuários
      const user1 = await User.create({ name: "Mauro Silva", email: "mauro@email.com" });
      const user2 = await User.create({ name: "Ana Costa", email: "ana@email.com" });
      
      // Criar itens
      const item1 = await Item.create({ name: "Caderno Universitário", price: 15.99 });
      const item2 = await Item.create({ name: "Caneta Azul", price: 2.50 });
      const item3 = await Item.create({ name: "Lápis HB", price: 1.20 });
      
      // Criar compras
      await Purchase.create({ userId: user1.id, itemId: item1.id, quantity: 2 });
      await Purchase.create({ userId: user2.id, itemId: item2.id, quantity: 3 });
      await Purchase.create({ userId: user1.id, itemId: item3.id, quantity: 5 });
      
      console.log("✅ Dados iniciais criados");
    }
    
    // Inicia o servidor
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
      console.log(`📊 Rotas disponíveis:`);
      console.log(`   GET  / - Health check`);
      console.log(`   GET  /health - Status do banco`);
      console.log(`   GET  /users - Lista usuários`);
      console.log(`   GET  /items - Lista itens`);
      console.log(`   GET  /purchases - Lista compras`);
    });
    
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer();