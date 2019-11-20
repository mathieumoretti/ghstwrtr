
var errorTypes = (function(){
    return { OK: "OK", ERROR : "ERROR"};
})()

var errors = (function ()
{    
    var createError = function(type, msg)
    {    var error = {code: type, message:msg};
        return error;
    }
    
    return {
        none: createError(errorTypes.OK, "No error."),
        some: createError(errorTypes.ERROR, "There are some errors.")
    };
})();

module.exports = errors;