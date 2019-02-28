var mongoose = require("mongoose");
var validateEmail = require("../services/validateEmail");
var Schema = mongoose.Schema;

/*
 This is the schema for the user - an example of allowed user data is:
   {
    "username": "alex",
    "email": "alexhughes@gmail.com",
    "password": "Hello12!",
  }
 */
var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: "Oops! Looks like you forgot to add a username"
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Oops! Looks like you forgot to add an email address is required",
    validate: [
      validateEmail,
      "Please make sure to fill in a valid email address"
    ],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please make sure to fill in a valid email address"
    ]
  },
  password: {
    type: String,
    required: "Oops! Make sure you've entered your password correctly!"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Users", UserSchema);
