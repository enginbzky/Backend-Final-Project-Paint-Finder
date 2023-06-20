import sequelize from "../config/connection.js";
import { DataTypes } from "sequelize";

const Yacht = sequelize.define(
  "Yacht",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    boatName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedMaterial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedSpeed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boatLength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boatDraft: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paintName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "yachts",
    timestamps: false,
  }
);

export default Yacht;
