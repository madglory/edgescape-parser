'use strict';
module.exports = function(options) {
  var header = (options && options.header) ? options.header : 'x-akamai-edgescape';

  return function(req, res, next) {
    if(req.headers[header]) {
      req.akamai = req.akamai || {};
      req.akamai.edgescape = req.akamai.edgescape || {};
      
      var pairs = req.headers[header].split(',');
      var edgescape = {};
      pairs.forEach(function(pair) {
        pair = pair.split('=');
        switch(pair[0]) {
          case 'area_code':
          case 'zip':
          case 'asnum':
            req.akamai.edgescape[pair[0]] = pair[1].split('+');
            break;
          default:
            req.akamai.edgescape[pair[0]] = decodeURIComponent(pair[1] || '');
        }
      });
    }

    next();
  }
};
