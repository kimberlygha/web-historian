var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

//DONT CHANGE THIS ---------------|
  if(req.method === 'GET'){
    //index page
    if(req.url === '/'){
      res.writeHead(200,{'Content-Type':'text/html'}); 
      fs.readFile(path.join(archive.paths.siteAssets+'/index.html'), function(err,data){
        res.end(data);
      }); 
//--------------------------------|
    //if we have the site in the archive


    //archived pages
    } else {
    //determine if we have the page in archive

      // call serve assets, passing it the full path of the file on the computer
      httpHelpers.serveAssets(res,req.url,function(err, data){
        res.end(data);
      })
      //if we do not have the site in the archive
    }
  }



  // res.end(archive.paths.list);
};
