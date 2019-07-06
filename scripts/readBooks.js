"use strict";

const path = require('path');
const fs = require('fs');

var rootDir = path.dirname(path.join(require.main.filename, ".."));

// Logging
const onResolvedLog = (resolvedValue) => console.log(resolvedValue);
const onResolvedLogLine = (resolvedValue) => onResolvedLog(resolvedValue + '\n');
const onResolvedLogArray = (resolvedValueArray) => resolvedValueArray.forEach(onResolvedLogLine);
const onRejectedLog = (error) => console.log(error);


const pointParser = function(content)
{
    return content.split(".") || [];
}

const filterContent = (content) => 
{
    let filters = [];
    let newContent = [];
    return filters.reduce(([], filter) => [parser(newContent)], content);
}

const parseContent = (content) => 
{
    let parsers = [pointParser];
    return parsers.reduce((acc, parser) => [parser(acc)], content);
}

const readPromise = function(filename)
{
    return new Promise((resolve, reject) => {
        var fullFileName = path.join(rootDir, filename);
        fs.readFile(fullFileName, 'utf8', function(err, contents) {
            if (err) reject(err);
            else
            {
                resolve(contents); 
            } 
        });
    });
};

const firstBookId = 8;
const books = 10;
for (let i = firstBookId; i < firstBookId + books; i++) {

    const filePath = `/tmp/pg${i}.txt`
    readPromise(filePath).then(parseContent, onRejectedLog).then(onResolvedLogArray, onRejectedLog);
}

