/*
 * (C) Copyright 2016 o2r project.
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

test('deleteFile', (t) => {
  t.plan(2);
  try {
    fs.mkdirSync('scratch/deleteFile');
    fs.writeFileSync('scratch/deleteFile/data/delete-me',
                     'this file should be deleted.');
  } catch (e) {}
  var newbag = new Bag('scratch/deleteFile');

  t.ok(newbag.validPath, 'Bag Instance has valid path');

  newbag.createBag().then(() => {
    t.pass('create new Bag without explicit path');
  }, e => {
    t.fail('create new Bag without explicit path');
  })
//  .then()
  .finally(() => {
    t.end();
  });
});
