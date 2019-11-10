const _ = require('underscore');

var utils = (function (){ 
    
    function fail(thing)
    {
        throw new Error(thing);
    }

    function warn(thing)
    {
        console.log(["WARNING:", thing].join(' ')); 
    }
    
    function note(thing) {  
        console.log(["NOTE:", thing].join(' '));
    }
    
    function existy(x) { return x != null }

    function truthy(x) { return ( x !==  false ) && existy(x) }

    function doWhen(cond, action)
    {  
        if(truthy(cond))
            return action();
        else
            return undefined;
    }
    
    function performTask(array) {
          _.each(array, function(elem) { 
                 doSomething(array[i]);
                  });
            }

    function executeIfHasField(target, name) {
         return doWhen(existy(target[name]), function() { 
                var result = _.result(target, name);
                console.log(['The result is', result].join(' '));
                return result;
            });
    }

    const clone = function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }    

    return {
        fail:fail,
        warn:warn,
        note:note,
        existy:existy,
        truthy:truthy,
        doWhen:doWhen,
        performTask:performTask,
        executeIfHasField:executeIfHasField,
        clone:clone
    };
})();
module.exports = utils;