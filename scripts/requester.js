const https = require('https');
const utils = require('./utils');
var rp = require('request-promise');

var requester = (function ()
{
    function request(aUrl)
    {
      var options = {
        uri: aUrl,
        resolveWithFullResponse: true   
      };
      return rp(options);                   
    }    

    return {
        request: request,
    };
})();

module.exports = requester;