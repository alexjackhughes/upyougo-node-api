var express = require("express"),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require("mongoose"),
  User = require("./api/models/authModel"),
  keys = require("./config/keys"),
  bodyParser = require("body-parser");

// Connecting to online database mlab
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/routes/authRoutes"); //importing login routes
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl,
    message: "Sorry! We couldn't find the resource you're looking for."
  });
});

app.listen(port);
console.log(
  "Yo Misha! The server has started on: http://localhost:" + port + " 🎉"
);
