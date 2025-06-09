import { Sequelize } from "sequelize";
import UserModel from "./user.js";
import ItemModel from "./item.js";
import PurchaseModel from "./purchase.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false, // para desativar logs SQL no console
});

const User = UserModel(sequelize);
const Item = ItemModel(sequelize);
const Purchase = PurchaseModel(sequelize);

// Associações
User.hasMany(Purchase, { foreignKey: "userId", onDelete: "CASCADE" });
Purchase.belongsTo(User, { foreignKey: "userId" });

Item.hasMany(Purchase, { foreignKey: "itemId", onDelete: "CASCADE" });
Purchase.belongsTo(Item, { foreignKey: "itemId" });

export { sequelize, User, Item, Purchase };
