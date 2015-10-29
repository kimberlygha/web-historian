var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

// method for get requests 
exports.serveAssets = function(res, asset, callback) {

  archive.isUrlArchived(asset, function(is) {
    if (is) {
      res.writeHead(200, {'Content-Type':'text/html'});
      fs.readFile(route, callback);
    } else {
      res.writeHead(404, {'Content-Type':'text/html'});
      res.write("Page not found");
      res.end();
    }
  })
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};


// method for post requests 
exports.servePost = function(res, asset, callback){
  archive.isUrlInList(asset, function(is){
    if(is){
      res.writeHead(302,{'Content-Type':'text/html'});
      fs.readFile(path.join(archive.paths.siteAssets+'loading.html'), callback);
    }else{
      archive.addUrlToList(asset, function(){
        res.writeHead({'Content-Type':'text/html'});
        fs.readFile(path.join(archive.paths.siteAssets+'loading.html'), callback);
      })
    }
  })


}

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
