var assert = require('assert');
var eventService = require('../services/eventservice');
const { describe, it } = require('mocha');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('getRandomStartNumber', () => {
  it('should return a random int', () => {
    let number = eventService.getRandomStartNumber();
    assert(number, "got a number");
  });
});
