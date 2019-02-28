module.exports = function(app) {
  var auth = require("../controllers/authController");

  // auth login routes
  app
    .route("/login")
    .get(auth.login)
    .post(auth.createUser);
};
