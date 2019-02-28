module.exports = function(app) {
  var auth = require("../controllers/authController");

  // auth login routes
  app
    .route("/login")
    .put(auth.login)
    .post(auth.createUser);
};
