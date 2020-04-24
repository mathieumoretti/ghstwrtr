'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sentence = sequelize.define('Sentence', {
    content: DataTypes.STRING
  }, {});
  Sentence.associate = function(models) {
    // associations can be defined here
  };
  return Sentence;
};