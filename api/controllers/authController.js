var mongoose = require("mongoose"),
  User = mongoose.model("Users");

exports.login = function(req, res) {
  console.log(req.body);
  return res.status(200).send({
    hello: "howdy"
  });

  // should get the data and validate it
  // if data isn't valid throw error,
  // Otherwise send an appropriate response
};

exports.createUser = function(req, res) {
  console.log(req.body);
  return res.status(200).send({
    hello: "howdy"
  });

  // should check the data
  // and allow the user to login
};
