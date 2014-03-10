var supplant = require('..'),
    Store = require('store-component'),
    assert = require('assert');

describe("API", function() {
  var store;
  beforeEach(function() {
    store = new Store();
    store.use(supplant);
  });

  it("should have a supplant hanndler", function() {
    assert.equal(typeof store.supplant, 'function');
  });

  it('should have a filter handler', function() {
    assert.equal(typeof store.filter, 'function');
  });
  
});

describe(".supplant", function() {
  var store;
  beforeEach(function() {
    store = new Store({
      github: 'store'
    });
    store.use(supplant);
  });

  it("should result of variables substitution on string", function() {
    var result = store.supplant('the repo is {{github}}');
    assert.equal(result, 'the repo is store');
  });

  it('should listen changes on variables', function(done) {
    var result = store.supplant('the repo is {{github}}', function(val) {
      if(val === 'the repo is brick') done();
    });
    store.set('github', 'brick');
    assert.equal(result, 'the repo is store');
  });

});

describe(".filter", function() {
  var store;
  beforeEach(function() {
    store = new Store({
      github: 'store'
    });
    store.use(supplant);
  });

  it("should filter string", function() {
    store.filter('upper', function(str) {
      return str.toUpperCase();
    });
    var result = store.supplant('the repo is {{github} | upper}');
    assert.equal(result, 'the repo is STORE');
  });

  it('should add multiple filters', function() {
    store.filter({
      upper: function(str) {
        return str.toUpperCase();
      },
      bang: function(str) {
        return str + '!';
      }
    });
    var result = store.supplant('the repo is {{github} | upper | bang}');
    assert.equal(result, 'the repo is STORE!');
  });

  it('should not share filters between stores', function() {
    store.filter('upper', function(str) {
      return str.toUpperCase();
    });
    var other = new Store({
      label: 'hello'
    });
    other.use(supplant);
    //upper doesn't exist
    assert.equal(other.supplant('{{label} | upper}'), 'hello');
  });

});

