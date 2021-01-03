'use strict';

const _ = require('underscore');

const createAdminUser = ()=>{
    return {
      name:'admin',
      email:'admin@admin.com',
      password:'admin',
      role:'admin'
    }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  
  var rawUsers = [
    createAdminUser()
  ]

   var users = _.map(rawUsers, (user)=>{
     user.createdAt = new Date();
     user.updatedAt = new Date();
      return user
    });
    return queryInterface.bulkInsert("Users", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
