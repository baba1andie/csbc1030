import { ormConnector } from './connector.js';

import { DataTypes } from 'sequelize';


const User = ormConnector.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'users'
    });

User.sync();

export { User }
