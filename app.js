var express = require("express"),
  app = express(),
  port = process.env.PORT || 3003,
  mongoose = require("mongoose"),
  User = require("./api/models/authModel"),
  keys = require("./config/keys"),
  bodyParser = require("body-parser"),
  validateUser = require("./api/middlewares/validateUser");

// Connecting to online database mLab
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

// Convert res.body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up middleware to check user data
app.use(validateUser);

// Import routes
var routes = require("./api/routes/authRoutes");
routes(app);

// Set up a default route for bad requests
app.use(function(req, res) {
  res.status(404).send({
    url: req.originalUrl,
    message: "Sorry! We couldn't find the resource you're looking for."
  });
});

// Open Node app
app.listen(port);
console.log(
  "Yo Misha! The server has started on: http://localhost:" + port + " 🎉"
);

// Close Node app
process.on("SIGINT", () => {
  console.log(
    "\n We're closing the connection to database (and the app), bye! 👋"
  );
  mongoose.connection.close();
  process.exit();
});
