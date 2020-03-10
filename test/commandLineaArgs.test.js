const commandLineArgs = require('command-line-args');

const optionDefinitions = [   
    { name: 'id', alias: 'i',type: String /*, defaultOption: true*/ },
    { name: 'type', alias: 't', type: String }
  ]

const options = commandLineArgs(optionDefinitions);
console.log(options);