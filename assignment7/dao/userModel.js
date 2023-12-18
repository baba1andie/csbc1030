

import { Sequelize } from 'sequelize';

const connector = new Sequelize('sql12671350', 'sql12671350', 'w8jpvaAJDj', {
    host: 'sql12.freemysqlhosting.net',
    dialect: 'mysql',
});


export { connector }