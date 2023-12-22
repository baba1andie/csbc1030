// userModel.js
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../../config/dbConfig');

const User = sequelize.define('User', {
    // Define your User model fields here
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Hash the password before saving to the database
User.beforeCreate(async (user) => {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
});

// Method to check the password against the hashed password
User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

User.associate = (models) => {
    User.hasMany(models.Post);
};

module.exports = { User };
