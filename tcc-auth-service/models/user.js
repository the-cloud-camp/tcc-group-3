const { DataTypes } = require("sequelize");
const sequelize = require("../db/postgres");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "member",
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

module.exports = User;
