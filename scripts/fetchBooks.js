"use strict";

const fh = require('./fileHandler');
const requester = require('./requester');
const utils = require('./utils');

var url = require('url');
var logcontent = (x)=>
{
    return utils.note(x.content);
};

const tmp = `${utils.rootDir}/tmp`
var promise = fh.mkdir2(tmp, true);

promise.then((res)=>{

    // request data
    const baseUrl = "https://www.gutenberg.org/cache/epub";
    const firstBookId = 8;
    const books = 1;
    for (let i = firstBookId; i < firstBookId + books ; i++) {
        const adr = `${baseUrl}/${i}/pg${i}.txt`
        var someUrl = url.parse(adr, true);
        requester.request(someUrl)
            .then(function(response){
                    return fh.write(`${tmp}/pg${i}.txt`, response.body);
            }).then(logcontent, utils.fail);
    }
});
