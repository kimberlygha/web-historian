var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

//if this page is required by another module
//
if (module.parent) {
  module.exports = server;
} else {
  //if it has no parent, act as main node server
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

