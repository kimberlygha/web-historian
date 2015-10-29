var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var qs = require('querystring');
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
  }else if(req.method=== 'POST'){
    //this is when the user presses enter on index page
    //string from input box gets added to sites.txt'
    var body = ''
    req.on('data', function(data){
      body += data; 
    })
    req.on('end',function(){
      body = qs.parse(body);
      console.log(body.url);
    })
    archive.isUrlArchived(body.url, function(is){
      if(is){
        res.statusCode = 302;
        res.setHeader("Location", req.url);
        res.end(); 
      }else{
        httpHelpers.servePost(res,req.url,function(err,data){
          res.end(data);
        })
      }
    })

  }



  // res.end(archive.paths.list);
};
