import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js"; 

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  streak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "Users", // asegúrate de que coincida con la DB
  timestamps: true,   // crea automáticamente createdAt y updatedAt
});

export default User;
