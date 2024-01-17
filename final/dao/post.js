import { ormConnector } from './connector.js';

import { DataTypes, Model } from 'sequelize';


const Post = ormConnector.define(
    "Post",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {

            tableName: "posts",
            timestamps: true,
        });

Post.sync();

export { Post };