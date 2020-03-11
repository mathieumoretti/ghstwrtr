var rp = require('request-promise');

var requester = (function ()
{
    function request(aUrl)
    {

      var options = {
        encoding: null,
        uri: aUrl,
        resolveWithFullResponse: true  ,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Encoding': 'deflate',
          //'Host':"aleph.gutenberg.org",
          'Accept-Language': 'Accept-Language: en-US,en;q=0.9,fr;q=0.8',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          //'Referer':"http://www.gutenberg.org/robot/harvest",
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
      } 
      };
      return rp(options);                   
    }    

    return {
        request: request,
    };
})();

module.exports = requester;