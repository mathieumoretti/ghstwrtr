"use strict";
const _ = require('underscore');
const commandLineArgs = require('command-line-args');
const path = require('path');

const fh = require('./fileHandler');
const utils = require('./utils');

const EpubParser = require('../scripts/parser/epubParser2');

const optionDefinitions = [   
    { name: 'id', alias: 'i', type: String },
    { name: 'type', alias: 't', type: String },
    { name: 'outDir', alias: 'o', type: String }
  ]

const options = commandLineArgs(optionDefinitions)

var id = options.id || 10900; //Bible
var type = "epub";
var rootDir = `${utils.rootDir}`;
var inDir = path.join(`${rootDir}`, "tmp", "fetched");
var outDir = path.join(`${rootDir}`, "tmp", "parsed");

if (utils.existy(options.outDir)) { 
    outDir = path.join(`${rootDir}`, `${options.outDir}`, "parsed");
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

const fileName = `pg${id}.${type}`;
var epubDocPromise = fh.read(`${inDir}/${fileName}`);

promise.then((res)=> {return epubDocPromise})
    .then((res)=>{
        var epubDoc = res.content;
        return new EpubParser(epubDoc).Parse();
    }).then((res)=>
    {
        var epubBook = res; 
        fh.write(`${outDir}/pg${id}.txt`, epubBook);
        console.log(epubBook.chapters[1].pages[0].lines[0]);
    });


// Idea for intro's of text 
// Mini-game 
// Randomize 10 sentences, ask user to choose 3.

