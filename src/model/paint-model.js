import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Paint = sequelize.define(
  "Paint",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paintName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    material: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maxSpeed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "paints",
    timestamps: false,
  }
);

export default Paint;
