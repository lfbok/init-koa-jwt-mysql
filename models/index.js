const { dbInfo } = require("../config.json");
const Sequelize = require("sequelize");

module.exports = new Sequelize(dbInfo.basename, dbInfo.username, dbInfo.password, {
  host: dbInfo.host,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
