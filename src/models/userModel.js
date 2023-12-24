// userModel.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/dbConfig');
const { Post } = require('./postModel.js');

const User = sequelize.define('User', {
    // Define your User model fields here
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    // address: {
    //     type: DataTypes.JSONB,
    //     allowNull: false,
    // },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // company: {
    //     type: DataTypes.JSONB,
    //     allowNull: false,
    // },
}, {
    tableName: 'User', // Specify the custom table name
    timestamps: false,
}

);

// Hash the password before saving to the database
User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
});

// Method to check the password against the hashed password
User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


User.hasMany(Post, { foreignKey: "userId" });

module.exports = { User };

// User.associate = (models) => {
//     User.hasMany(models.Post);
// };