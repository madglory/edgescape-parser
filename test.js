'use strict';
var assert = require('assert');
var edgescapeParser = require('./');

it('parses header into an object', function(done) {

  var req = {
    headers: {
      'x-akamai-edgescape': 'key1=val1,key2=val2,key3=val3,asnum=3+4+5,area_code=100-200+300-400'
    }
  };

  var expectedObject = {
    key1: 'val1',
    key2: 'val2',
    key3: 'val3',
		asnum: [3,4,5],
		area_code: ['100-200','300-400']
  };

  edgescapeParser()(req, {}, function() {
    assert(req.akamai);
    assert(req.akamai.edgescape);
		assert.deepEqual(req.akamai.edgescape, expectedObject);

    done();

  });

});

it('moves along if no header is available', function(done) {

  var req = {
    headers: {}
  };

  edgescapeParser()(req, {}, function() {
    assert.equal(req.akamai, undefined);

    done();

  });

});
