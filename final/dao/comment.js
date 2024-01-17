import { ormConnector } from './connector.js';

import { DataTypes, Model } from 'sequelize';

const Comment =
    ormConnector.define( "Comment",

        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "posts",
                    key: "id",
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            body: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: "comments",
            timestamps: true,
        });

    Comment.sync();

export { Comment };