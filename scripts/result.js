
const error = require('./error');

var result = (function ()
{
    function Result(){
        return {
            content: null,
            error: error.none,
        }
    };
    return {
        Result:Result
    };
})();


module.exports = result;