var express = require("express"),
  app = express(),
  port = process.env.PORT || 3004,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  User = require("./api/models/authModel"),
  keys = require("./config/keys"),
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

// Allow all cors - WARNING: Wouldn't use in production app
app.use(cors());

// Stop CORS blocking the React app localhost
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

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
