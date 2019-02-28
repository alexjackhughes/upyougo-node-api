var express = require("express");
var app = express();
var port = process.env.PORT || 3001;

app.listen(port);

console.log("The server has started on: " + port);
