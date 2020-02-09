const utils = require('./utils');

var errorTypes = (function(){
    return { 
        OK: "OK",
        ALREADY_EXISTS : "ALREADY_EXISTS",
        ERROR : "ERROR",
        UNKNOWN: "UNKNOWN"
    };
})()

const errors = (function ()
{    
    var createError = function(type, msg, opts)
    {    
        var error = 
        {   
            code: type,
            message:msg,
            intCode:0,
        };

        if (utils.existy(opts) && opts['intCode'])
        {
            error.intCode = opts['intCode'];
        }
        
        return error;
    }
    
    return {
        none: createError(errorTypes.OK, "No error.", {intCode:1}),
        alreadyExists: createError(errorTypes.ALREADY_EXISTS, "The resource already exists."),
        some: createError(errorTypes.ERROR, "There are some errors."),
        unknown: createError(errorTypes.UNKNOWN, "Unknown error. Add a code entry.", {intCode:999}),
    };
})();

module.exports = errors;