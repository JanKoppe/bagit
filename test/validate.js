/*
 * (C) Copyright 2016 Jan Koppe.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * A module to support creation, modification and validation of BagIt bags.
 */

var test = require('tape');
var Bag = require('../index.js');
var fs = require('fs');
var Promise = require('bluebird');

test('prepare environment', (t) => {
  t.plan(1);
  try {
    fs.mkdirSync('scratch');
    t.pass('test directory');
  } catch(e) {
    if(e.code !== 'EEXIST') {
      t.fail('COULD NOT CREATE TEST DIRECTORY');
      console.log(e);
    } else {
      t.pass('test directory (existing)');
    }
  }
});

test('validateBag', t => {
  t.plan(0);
  var newbag = new Bag('scratch/validateBag');
  newbag.createDirectory('scratch/validateBag')
  .then(this.createBag)
  .then(newbag.validate)
  .catch(e => {
    console.log(e);
    t.fail(e);
  }).finally(() => {
    t.end();
  });
});

