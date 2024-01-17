import { ormConnector } from './connector.js';

import { DataTypes, Model } from 'sequelize';


const User =  ormConnector.define(
    "User",

        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
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
            address: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            company: {
                type: DataTypes.JSON,
                allowNull: false,
            },
        },
        {
            tableName: "user",
            timestamps: true,
        });


User.sync();

export { User };