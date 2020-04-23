"use strict";
const _ = require('underscore');
const url = require('url');
const commandLineArgs = require('command-line-args');
const path = require('path');

const fh = require('./fileHandler');
const requester = require('./requester');
const utils = require('./utils');

const optionDefinitions = [   
    { name: 'id', alias: 'i',type: String },
    { name: 'type', alias: 't', type: String },
    { name: 'outDir', alias: 'o', type: String }
  ]

const options = commandLineArgs(optionDefinitions)

var id = options.id || 8;
var type = "txt";
var rootDir = `${utils.rootDir}`;
var outDir = path.join(`${rootDir}`, "tmp", "fetched");

if (utils.existy(options.outDir)) { 
    outDir = path.join(`${rootDir}`, `${options.outDir}`, "fetched");
}

if(utils.existy(options.type))
{
    switch(options.type)
    {
        case "txt":
            type = options.type;
        case "epub":
            type = `${options.type}`;
            break;
        default:
            utils.fail("Wrong type.");
            break;
    };
}

var logcontent = (x)=>
{
    return utils.note(x.content);
};

var promise = fh.mkdir2(outDir, true);

promise.then((res)=>{

    // request data
    const baseUrl = "https://www.gutenberg.org/cache/epub";

    // Ref format
    // //const adr = "http://www.gutenberg.org/robot/harvest?filetypes[]=epub.noimages";
    const fileName = `pg${id}.${type}`;
    const adr = `${baseUrl}/${id}/${fileName}`;
    var someUrl = url.parse(adr, true);
    requester.request(someUrl)
        .then(function(response){
                 return fh.write(`${outDir}/${fileName}`, response.body);
        }).then(logcontent, utils.fail);
});
