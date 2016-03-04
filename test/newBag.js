var test = require('tape');
var Bag = require('../index.js');

test('create a new Bag', (t) => {
  var testbag = new Bag('scrap/test_newBag/');
  var validationResult = testbag.validate();
  if(t.true(validationResult.isValid)) {
    t.pass('successfully created a new Bag');
  } else {
    t.fail('bag creation failed');
  }
});
