const _ = require('underscore');

const utils = require('./utils');

var promiseMaker = (function ()
{

    function make(asyncFct)
    {
        return new Promise(function(resolve, reject)
        {
            asyncFct(resolve, reject);
        });
    }

    return {
        make: make,
    };
})();

module.exports = promiseMaker;