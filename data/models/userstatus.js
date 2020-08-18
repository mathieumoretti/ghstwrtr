'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserStatus = sequelize.define('UserStatus', {
    user_id: DataTypes.STRING,
    user_status: DataTypes.STRING
  }, {});
  UserStatus.associate = function(models) {
    // associations can be defined here
  };
  return UserStatus;
};