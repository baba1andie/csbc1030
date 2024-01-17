

import { Sequelize } from 'sequelize';

// const ormConnector = new Sequelize('sql12671350', 'sql12671350', 'w8jpvaAJDj', {
//     host: 'sql12.freemysqlhosting.net',
//     dialect: 'mysql',
// });

const ormConnector = new Sequelize('defaultdb', 'avnadmin', 'AVNS_uCvawkCzv-2BdJ-C-Dy',
    {
                logging: console.log,
                port: 19662,
                host: 'mysql2d189f6e-chandrasekhar.a.aivencloud.com',
                dialect: 'mysql',
                ssl: true
            });


export { ormConnector }