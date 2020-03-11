"use strict";
const _ = require('underscore');
var url = require('url');

const fh = require('./fileHandler');
const requester = require('./requester');
const iconv  = require('iconv-lite');
const utils = require('./utils');

const commandLineArgs = require('command-line-args')

const optionDefinitions = [   
    { name: 'id', alias: 'i',type: String },
    { name: 'type', alias: 't', type: String }
  ]

const options = commandLineArgs(optionDefinitions)


var id = options.id || 8;
var type = "txt";
const books = 1;

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

const tmp = `${utils.rootDir}/tmp`;

var promise = fh.mkdir2(tmp, true);

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
                var res = response.toJSON();

                var utf8String = iconv.decode(new Buffer(response.body), "ISO-8859-1");
                console.log(utf8String);

                 return fh.write(`${tmp}/${fileName}`, response.body);
        }).then(logcontent, utils.fail);
});
