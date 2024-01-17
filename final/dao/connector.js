

import { Sequelize } from 'sequelize';



const ormConnector = new Sequelize('defaultdb', 'avnadmin', 'AVNS_uCvawkCzv-2BdJ-C-Dy',
    {
                logging: console.log,
                port: 19662,
                host: 'mysql2d189f6e-chandrasekhar.a.aivencloud.com',
                dialect: 'mysql',
                ssl: true
            });


export { ormConnector }