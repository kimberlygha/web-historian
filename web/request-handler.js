var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  //handle a request for './'
  // send index.html
  if(req.method === 'POST'){
    // if(archive.isUrlArchived(url)){
    //   res.redirect('url');
    //   res.end(); 
    // }else{
    //   httpHelpers.serveAssets(res,'index.html', function(err, data){
    //     res.end();  
    //   })
    // }
  }else if(req.method === 'GET'){
    if(req.url === '/'){
      httpHelpers.serveAssets(res,__dirname +'/public/index.html',function(err, data){
        res.end(data);
      })
    } else if (archive.isUrlArchived(req.url)){
      httpHelpers.serveAssets(res,archive.archivedSites+req.url,function(err, data){
        res.end(data);
      })
    }
  }



  // res.end(archive.paths.list);
};
