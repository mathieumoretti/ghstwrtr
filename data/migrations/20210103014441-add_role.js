'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn(
    'Users', // name of Source model
    'role', // name of the key we're adding 
    {
      type: Sequelize.ENUM('admin', 'ghost', 'guest'),      
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
  );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.removeColumn(
    'Users', // name of Source model
    'role' // key we want to remove
  );
  }
};
