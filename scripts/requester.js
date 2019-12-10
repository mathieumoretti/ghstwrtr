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