'use strict';

const path = require('path');
const _ = require('underscore');

const Sentence = require('../models/sentence');

const fh = require('../../scripts/fileHandler');
const utils = require('../../scripts/utils');


var rootDir = `${utils.rootDir}`;
var inDir = path.join(`${rootDir}`, "tmp", "parsed");
const filename = `pg10900.txt`;
const filepath = `${inDir}/${filename}`;

var readPromise = fh.read(filepath);

module.exports = {
  up : function (queryInterface, Sequelize) {


    
    // return queryInterface.bulkInsert('Sentences', [{
    //   content : lines,
    //   createdAt : new Date(),
    //   updatedAt : new Date(),
    // }], {});
  // up: (queryInterface, Sequelize) => {
  //   /*
  //     Add altering commands here.
  //     Return a promise to correctly handle asynchronicity.

  //     Example:
  //     return queryInterface.bulkInsert('People', [{
  //       name: 'John Doe',
  //       isBetaMember: false
  //     }], {});
  //   */

    return readPromise.then((result) => {
          var data = result.content;
          var lines = data.split("\n")
          utils.note(lines[1]);
          var sentences = [
          { content: lines[1],
            createdAt : new Date(),
            updatedAt : new Date(),
          }];         
          
          //var lines = data.split("\n");
          //utils.note(lines[0]); 
          return queryInterface.bulkInsert("Sentences", sentences);
      });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return promiseMaker.make(()=>{utils.note("What down?")})
  }
};
