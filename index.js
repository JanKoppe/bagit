/*
 *  A module to support creation, modification and validation of BagIt bags.
 */
'use strict';

/**
 *  @constructor
 *  @param {string} path - path to the Bag.
 */
function BagIt(path) {
  this.validPath = false;
  this.path = '';

  if(path) {
    //TODO: check if path is accessible and a directory.
    this.path = path;
  } else {
    //ERROR - invalid path.
  }

}

/**
 *  Create a empty Bag at the path location.
 */
BagIt.prototype.create = () => {

};

/**
 *  Read the Bag at the path location.
 */
BagIt.prototype.open = () => {

};

/**
 *  Set a new path as the Bag location.
 *  @param {string} path - path to the Bag.
 */
BagIt.prototype.setDirectory = (path) => {
  //TODO: check if path is accessible and a directory.
  if(path) {
    this.path = path;
  }
};

/**
 *  Get the current path to the Bag.
 *  @returns {string} Current path to the Bag.
 */
BagIt.prototype.getDirectory = () => {
  return this.path;
};

/**
 *  Add a new tag to the Bag.
 *  @param {string} tag - Name for the tag.
 *  @param {string} content - Content for the tag.
 *  @returns {boolean} True, if addition was successful.
 */
BagIt.prototype.addTag = (tag, content) => {
  return false;
};

/**
 *  Delete a tag from the Bag.
 *  @param {string} tag - Name of the tag to delete.
 *  @returns {string} True, if deletion was successful.
 */
BagIt.prototype.delTag = (tag) => {
  return false;
};

/**
 *  Get the content of a tag.
 *  @param {string} tag - Name of the tag.
 *  @returns {?string} content of the tag. null if tag does not exist.
 */
BagIt.prototype.getTag = (tag) => {
  return null;
};

/**
 *  Set the content of a tag.
 *  @param {string} tag - Name of the tag.
 *  @param {string} content - Content for the bag.
 *  @returns {boolean} True, if tag modification was successful.
 */
BagIt.prototype.setTag = (tag, content) => {
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
 *  @returns {?Object} tags - available tags from the bag. null if no tags found.
 */
BagIt.prototype.listTags = () => {
  return null;
};

BagIt.prototype.addFile = (dest, content) => {
  return false;
};

/**
 *  Copy a file from the local filesystem to the Bag.
 *  @param {string} dest - Destination Path, relative to the data/ directory.
 *  @param {string} source - Absolute path to the source file.
 *  @returns {boolean} True, if copying the file was successful.
 */
BagIt.prototype.copyFile = (dest, source) => {
  return false;
};

/**
 *  Delete a file from the Bag.
 *  @param {string} file - Path to the to be deleted file, relative to the
 *                         data/ directory.
 *  @returns {boolean} True, if deletion was successful.
 */
BagIt.prototype.delFile = (file) => {
  return false;
};

/**
 *  Read the contents of a file from the Bag.
 *  @param {string} file - Path to the file, relative to the /data directory.
 *  @returns {?Object} content - Buffer Object to the file, null if not found.
 */
BagIt.prototype.readFile = (file) => {
  return null;
};

/**
 *  Validate the format and content of the Bag.
 *  @param {boolean} fast - If set to True, skip checksums.
 *  @returns {Object} result - `{isValid:true}` if valid, contains errors
 *                              otherwise.
 */
BagIt.prototype.validate = (fast) => {
  return {isValid : false};
};
module.exports = BagIt;
