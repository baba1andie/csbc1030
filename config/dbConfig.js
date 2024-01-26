const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("ASSIGNMENT_08", "cloudsql", "nopwd", {
//   host: "gothic-oven-410701:us-east4",
//   port: "3306",
//   dialect: "mysql",
// });

// const sequelize = new Sequelize(
//     "cloudsql",
//     "cloudsql",
//     "AVNS_uCvawkCzv-2BdJ-C-Dy",
//     {
//       logging: console.log,
//       port: 3306,
//       host: "34.86.125.163",
//       dialect: "mysql",
//       ssl: true,
//     },
// );



const sequelize = new Sequelize(
    "rap",
    "avnadmin",
    "AVNS_uCvawkCzv-2BdJ-C-Dy",
    {
      logging: console.log,
      port: 19662,
      host: "mysql2d189f6e-chandrasekhar.a.aivencloud.com",
      dialect: "mysql",
      ssl: true,
    },
);


module.exports = sequelize;
