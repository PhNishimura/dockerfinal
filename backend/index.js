
import express from "express";
import cors from "cors";
import { sequelize, User, Item, Purchase } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota raiz para indicar que o backend está rodando
app.get("/", (req, res) => {
  res.send("Backend está rodando! Use /users, /items ou /purchases");
});

// Rotas da API
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ include: Purchase });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/purchases", async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ include: [User, Item] });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sincroniza banco e inicia servidor
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Backend rodando em http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Erro ao sincronizar banco:", err);
});

