const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "CSBC1030_Final_Assignment",
  "avnadmin",
  "AVNS_urgsiIqhNFwvZa-e7pv",
  {
    logging: console.log,
    port: 13626,
    host: "csbc-service-csbc1040.a.aivencloud.com",
    dialect: "mysql",
    ssl: true,
  },
);

module.exports = sequelize;
