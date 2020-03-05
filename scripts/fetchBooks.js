"use strict";
const _ = require('underscore');
var url = require('url');

const fh = require('./fileHandler');
const requester = require('./requester');
const utils = require('./utils');

const commandLineArgs = require('command-line-args')

const optionDefinitions = [   
    { name: 'id', type: String, defaultOption: true },
    { name: 'type', alias: 't', type: String }
  ]

const options = commandLineArgs(optionDefinitions)


var id = 8;
var type = "txt";
if(utils.existy(options[id]))
{
    switch(options[id])
    {
        case "txt":            
        case "epub":
            type = options[id];
            break;
        default:break;
    };
}

var logcontent = (x)=>
{
    return utils.note(x.content);
};

const tmp = `${utils.rootDir}/tmp`
var promise = fh.mkdir2(tmp, true);

promise.then((res)=>{

    // request data
    const baseUrl = "https://www.gutenberg.org/cache/epub";
    const firstBookId = id;
    const books = 1;
    for (let i = firstBookId; i < firstBookId + books ; i++) {
        const fileName = `pg.${type}`;
        //const adr = `${baseUrl}/${i}/${fileName}.noimages`
        const adr = "http://www.gutenberg.org/robot/harvest?filetypes[]=epub.noimages";
        var someUrl = url.parse(adr, true);
        requester.request(someUrl)
            .then(function(response){
                    return fh.write(`${tmp}/${fileName}`, response.body);
            }).then(logcontent, utils.fail);
    }
});
