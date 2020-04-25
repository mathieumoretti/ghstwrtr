'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    content:  DataTypes.TEXT
  }, {});
  Sentence.associate = function(models) {
    // associations can be defined here
  };
  return Sentence;
};