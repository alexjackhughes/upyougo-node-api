var mongoose = require("mongoose"),
  User = mongoose.model("Users");

exports.login = function(req, res) {
  var userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  return res.status(200).send({
    code: 201,
    message: "Awesome, you've successfully logged in!",
    user: {
      ...userData,
      password: "secret"
    }
  });
};

exports.createUser = function(req, res) {
  var userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  var newUser = new User(userData);
  newUser.save(function(e, user) {
    if (e) {
      return res.status(400).send({
        code: 400,
        message: "Sorry, looks like you've already registered with that email!",
        error: e
      });
    }

    return res.status(201).send({
      code: 201,
      message:
        "Success! Your profile has been created " + req.body.username + "!",
      user: {
        ...user._doc,
        password: "secret"
      }
    });
  });
};
