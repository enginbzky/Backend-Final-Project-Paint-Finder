import Yacht from "../model/yacht-model.js";
import User from "../model/user-model.js";
import sequelize from "./connection.js";

User.hasMany(Yacht, { foreignKey: "userId", onDelete: "CASCADE" }); //foreignKey is used to name the foreign key, if you remove it userId will be named as UserId automatically, which is generated automatically by sequelize
Yacht.belongsTo(User, { foreignKey: "userId" });

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectToDatabase();
