const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.LOG_LEVEL === "debug" ? console.log : false
  }
);

const ping = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { sequelize, ping };
