var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};
exports.paths = paths; 
// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //read sites.txt file
  fs.readFile(exports.paths.list,'utf8', function(err,data){
    if (err){
      console.log(err);
    } else {
      var sites = data.split('\n');
      callback(sites);
    }
  })

  //make it into an array
  //this function takes a callback
  //call callback on each item in the array

};
// Post -> see if the site is already in the queue
exports.isUrlInList = function(value, callback) {
  exports.readListOfUrls(function(urls){
    var result = _.contains(urls, value)
    callback(result);
  });
};
// Post -> if url is not in list, perform this function 
exports.addUrlToList = function(value, callback) {
  //call is url in list, if false, do this stuff
  exports.isUrlInList(value, function(is) {
    if (is) {
      console.log("file already in list");
    } else {
      fs.appendFile(paths.list, value + '\n', "utf8", function(err){
        if (err) {
          console.log(err);
        }
        callback();
      })
    }
  })

};
// Post -> checks to see the webiste is archived already before acting 
// htmlfetcher -> test before it deletes a site from the queue 
exports.isUrlArchived = function(url, callback) {
  //read the directory of sites, save to an array
  fs.readdir(paths.archivedSites, function(err, dir){
    if (err) {
      console.log(err);
    } else {
      var result = _.contains(dir, url)
      callback(result);
    }
  })
  //call contains on the array
  //pass contains value to callback

};
// htmlfetcher -> gets the site and puts it into the archive 
exports.downloadUrls = function(urls) {
  //call read list of url
  _.each(urls, function(url){
    exports.isUrlInList(url, function(is){
      if(is){
        console.log("this is the internet site", url);
        saveSite(url);
      }
    })
  })
  var saveSite = function(site){
    request.get({
      url: site, 
      progress:function(current, total){
      console.log(current+'out of '+total);
      }
    },'get.bin', 
    function(err, result){
      if(err){
        console.log(err);
        return;
      }
      console.log(result.code,result.headers,result.file);
    });
  }
};





