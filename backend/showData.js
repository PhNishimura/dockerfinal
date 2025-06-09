import { sequelize, User, Item, Purchase } from "./models/index.js";

async function showData() {
  await sequelize.sync();

  const users = await User.findAll({ include: Purchase });
  console.log("Usuários:");
  // Exibe uma tabela com info básica dos usuários
  console.table(users.map(u => ({ id: u.id, name: u.name, email: u.email })));

  const items = await Item.findAll();
  console.log("\nItens de papelaria:");
  console.table(items.map(i => ({ id: i.id, name: i.name, price: i.price })));

  const purchases = await Purchase.findAll({ include: [User, Item] });
  console.log("\nCompras:");
  // Exibe info relevante da compra junto com nome do usuário e do item
  console.table(
    purchases.map(p => ({
      id: p.id,
      user: p.User ? p.User.name : "N/A",
      item: p.Item ? p.Item.name : "N/A",
      quantity: p.quantity
    }))
  );
}

showData().then(() => process.exit());
