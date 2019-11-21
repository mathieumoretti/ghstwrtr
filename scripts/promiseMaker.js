const utils = require('./utils');

var promiseMaker = (function ()
{
     function make(processor, processingArgs, controller)
    {
        var promise = new Promise(function(resolve, reject) {
            // do a thing, possibly async, then…
            var result = processor(processingArgs);
            if (controller(result.error)) {
                resolve(result.content);
            }
            else {
                reject(result.error);
            }
        });
        return promise;
    }
    return {
        make: make,
    };
})();

module.exports = promiseMaker;