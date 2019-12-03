const _ = require('underscore');
const path = require('path');
const fs = require('fs');

const utils = (function (){ 
    
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
    
    function random() {
        const d = new Date();
        const n = d.getTime();
        return Math.random() * n;
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

    function invoker (NAME, METHOD) {
        return function(target /* args ... */) {
            if (!existy(target))
                fail("Must provide a target");
            
            var targetMethod = target[NAME];
            var args = _.rest(arguments);
            return doWhen((existy(targetMethod) && METHOD === targetMethod),
                function() {
                    return targetMethod.apply(target, args);
            });
        };
    };

    function executeIfHasField(target, name) {
         return doWhen(existy(target[name]), function() { 
                var result = _.result(target, name);
                console.log(['The result is', result].join(' '));
                return result;
            });
    }

    function fnull(fun /*, defaults */) {
        var defaults = _.rest(arguments);

        return function(/* args */) {
            var args = _.map(arguments, function(e, i) {
                return existy(e) ? e : defaults[i];
            });
            return fun.apply(null, args);
        }; 
    };
      

    const clone = function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }    

    function checker(/* validators */) {
        var validators = _.toArray(arguments);
        return function(obj) {
            return _.reduce(validators, function(errs, check) {
               if (check(obj))
                   return errs;
               else
                    return _.chain(errs).push(check.message).value();
           }, []);
       };
   } 

    function repeat(times, VALUE) {
          return _.map(_.range(times), function() { return VALUE; }); 
    }

    function repeatedly(times, fun) {
        return _.map(_.range(times), fun);
    }

    const getRootDir = () => path.parse(process.cwd()).root

    // TODO:
    // Different treatment if init CurrentPath is file or folder 

    // findRoot => search backwards for index.js
    function findRoot(currentPath, rootFileName)
    {
        var potRootMarker = path.join(currentPath, rootFileName);
        // is root base case
        if (currentPath === getRootDir())
            return undefined;
        // currentDir + rootFileName exist?        
        if (fs.existsSync(potRootMarker))
            // yes return that path
            return currentPath;
        else{
            var newPotRoot =path.join(currentPath, "..");
            // no pluck a level and startover
            return findRoot(newPotRoot, rootFileName);
        }
    }




    const rootFromExe = (
        (currentFilePath, rootFileName) => findRoot(currentFilePath,rootFileName)
    )(path.dirname(require.main.filename), ".root");



    return {
        fail:fail,
        warn:warn,
        note:note,
        random:random,
        existy:existy,
        truthy:truthy,
        doWhen:doWhen,
        performTask:performTask,
        invoker:invoker,
        fnull:fnull,
        executeIfHasField:executeIfHasField,
        repeat:repeat,
        repeatedly: repeatedly,
        clone:clone,
        checker:checker,
        rootDir:rootFromExe
    };
})();
module.exports = utils;
