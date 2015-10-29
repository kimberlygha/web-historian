var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


// htmlfetcher -> know what sites to look for and archive
exports.readListOfUrls = function() {
};
// Post -> see if the site is already in the queue
exports.isUrlInList = function() {
};
// Post -> if url is not in list, perform this function 
exports.addUrlToList = function() {
};
// Post -> checks to see the webiste is archived already before acting 
// htmlfetcher -> test before it deletes a site from the queue 
exports.isUrlArchived = function(url) {
};
// htmlfetcher -> gets the site and puts it into the archive 
exports.downloadUrls = function() {
};
