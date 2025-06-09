import { sequelize, User, Item, Purchase } from "./models/index.js";

async function seed() {
  try {
    // Sincroniza o banco (cria as tabelas, se não existirem)
    await sequelize.sync({ force: true }); // 'force: true' apaga e recria as tabelas

    // Criar usuários
    const user1 = await User.create({ name: "Mauro", email: "mauro@email.com" });
    const user2 = await User.create({ name: "Ana", email: "ana@email.com" });

    // Criar itens de papelaria
    const item1 = await Item.create({ name: "Caderno", price: 15.99 });
    const item2 = await Item.create({ name: "Caneta", price: 2.50 });

    // Criar compras
    await Purchase.create({ userId: user1.id, itemId: item1.id, quantity: 1 });
    await Purchase.create({ userId: user2.id, itemId: item2.id, quantity: 3 });

    console.log("🎉 Banco populado com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao popular banco:", error);
  }
}

seed();
