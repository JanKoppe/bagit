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
'use strict';

var fs = require('fs');
var Promise = require('bluebird');
/**
 *  @constructor
 *  @param {string} path - path to the Bag.
 */
function Bag (path) {

  this.validPath = false;
  this.path = '';
  this.tags = {};
  this.version = '0.97';
  /**
   *  Checks if provided path is accessible and a directory.
   *  @param {string} path - path to check
   *  @returns {boolean} True, if accessible & directory.
   */
  this.isDirectory = (path) => {
    if(!path) {
      return false;
    } else {
      try {
        return fs.statSync(path).isDirectory();
      } catch (e) {
        return false;
      }
    }
  };

  /**
   *  Create a Directory at path
   *  @param {string} path
   *  @returns {Promise}
   */
  this.createDirectory = (path) => {
    return new Promise((fulfill, reject) => {
      if(this.isDirectory(path)) {
        fulfill();
      } else {
        fs.mkdir(path, e => {
          if(e) {
            reject(e);
          }
          else {
            fulfill();
          }
        });
      }
    });
  };

  if(path && this.isDirectory(path)) {
    this.path = path;
    this.validPath = true;
  }

  /**
   *  Create a empty Bag at the path location.
   *  @param {string} [newpath] - Optional path to create the Bag at.
   *  @returns {Promise}
   */
  this.createBag = (newpath) => {
    return new Promise((fulfill, reject) => {
      if(newpath) {
        this.path = newpath;
      }

      if(!this.path) {
        reject('no path');
      }

     this.createDirectory(this.path)
      .then(() => {
        this.validPath = true;
      })
      .then(this.createDeclaration)
      .then(() => {
        return this.createDirectory(this.path + '/data');
      })
      .then(()=>{fulfill();})
      .catch(e=>{reject(e);}) ;

    });
  };

  /**
   *  Create a Bag Declaration.
   *  @returns {Promise}
   */
  this.createDeclaration = () => {
    return new Promise ((fulfill, reject) => {
      if(!this.validPath) {
        reject('invalid Path');
      } else {
        fs.writeFile(this.path + '/bagit.txt',
            'BagIt-Version: 0.97\nTag-File-Character-Encoding: UTF-8',
            {
              'encoding': 'utf8',
            },
          err => {
            if(err) {
              reject(err);
            } else {
              fulfill();
            }
        });
      }
    });
  };


  /**
   *  Read the Bag at the path location.
   *  @param {string} path - path to the Bag.
   *  @returns {boolean} True, if read successful.
   */
  this.openBag = () => {

  };

  /**
   *  Set a new path as the Bag location.
   *  @param {string} path - path to the Bag.
   *  @returns {boolean} True, if location valid.
   */
  this.setPath = (path) => {
    if(path && this.isDirectory(path)) {
      this.path = path;
      return true;
    } else {
      return false;
    }
  };

  /**
   *  Get the current path to the Bag.
   *  @returns {string} Current path to the Bag.
   */
  this.getPath = () => {
    return this.path;
  };

  /**
   *  Add a new tag to the Bag.
   *  @param {string} tag - Name for the tag.
   *  @param {string} content - Content for the tag.
   *  @returns {boolean} True, if addition was successful.
   */
  this.addTag = (tag, content) => {
    return false;
  };

  /**
   *  Delete a tag from the Bag.
   *  @param {string} tag - Name of the tag to delete.
   *  @returns {string} True, if deletion was successful.
   */
  this.delTag = (tag) => {
    return false;
  };

  /**
   *  Get the content of a tag.
   *  @param {string} tag - Name of the tag.
   *  @returns {?string} content of the tag. null if tag does not exist.
   */
  this.getTag = (tag) => {
    return null;
  };

  /**
   *  Set the content of a tag.
   *  @param {string} tag - Name of the tag.
   *  @param {string} content - Content for the bag.
   *  @returns {boolean} True, if tag modification was successful.
   */
  this.setTag = (tag, content) => {
    return false;
  };

  /**
   *  Add a file from a buffer to the Bag.
   *  @param {string} dest - Destination Path, relative to the data/ directory.
   *  @param {buffer} content - Buffer to the content of the file.
   *  @returns {boolean} True, if adding the file was successful.
   */

  /**
   *  List available tags in the Bag.
   *  @returns {?Object} tags - available tags from the bag. null if no tags
   *                            found.
   */
  this.listTags = () => {
    return null;
  };

  this.addFile = (dest, content) => {
    return false;
  };

  /**
   *  Copy a file from the local filesystem to the Bag.
   *  @param {string} dest - Destination Path, relative to the data/ directory.
   *  @param {string} source - Absolute path to the source file.
   *  @returns {boolean} True, if copying the file was successful.
   */
  this.copyFile = (dest, source) => {
    return false;
  };

  /**
   *  Delete a file from the Bag.
   *  @param {string} file - Path to the to be deleted file, relative to the
   *                         data/ directory.
   *  @returns {boolean} True, if deletion was successful.
   */
  this.delFile = (file) => {
    return false;
  };

  /**
   *  Read the contents of a file from the Bag.
   *  @param {string} file - Path to the file, relative to the /data directory.
   *  @returns {?Object} content - Buffer Object to the file, null if not found.
   */
  this.readFile = (file) => {
    return null;
  };

  /**
   *  Validate the format and content of the Bag.
   *  @param {boolean} fast - If set to True, skip checksums.
   *  @returns {Object} result - `{isValid:true}` if valid, contains errors
   *                              otherwise.
   */
  this.validate = (fast) => {
    return {isValid : false};
  };
}
module.exports = Bag;
