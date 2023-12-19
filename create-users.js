'use strict';

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Your existing code for creating users
      const users = [...]; // Your array of user data

      // Log SQL queries
      for (const user of users) {
        await queryInterface.bulkInsert('Users', [user]);
        console.log(`User inserted: ${user.username}`);
      }

      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Your existing code for reverting changes
  },
};
