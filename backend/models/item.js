import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Item", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
  }, {
    timestamps: false,
  });
};
