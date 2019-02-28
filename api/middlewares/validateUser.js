var _ = require("lodash");
var validateEmail = require("../services/validateEmail");
var validatePassword = require("../services/validatePassword");

module.exports = (req, res, next) => {
  var data = req.body;

  try {
    if (_.isEmpty(data)) {
      return res
        .status(400)
        .send({ code: 400, message: "It looks like you've sent no data" });
    }

    if (!_.has(data, "username") && !_.isString(data.username)) {
      return res.send({
        code: 400,
        message: "Oops! Looks like you need to add a valid username!"
      });
    }

    if (
      (!_.has(data, "email") && !_.isString(data.email)) ||
      !validateEmail(data.email)
    ) {
      return res.status(400).send({
        code: 400,
        message: "Oops! Looks like you need to add a valid email!"
      });
    }

    if (!_.has(data, "password") && !_.isString(data.password)) {
      return res.status(400).send({
        code: 400,
        message: "Oops! Looks like you need to add a valid password!"
      });
    } else if (!validatePassword(data.password)) {
      return res.status(400).send({
        code: 400,
        message:
          "Make sure your password is at least 8 characters, with at least one uppercase letter, one lowercase letter, one number and one special character"
      });
    }

    next();
  } catch (e) {
    res.send({
      code: 500,
      message: "Sorry about this! Seems we've hit a bug",
      error: e
    });
  }
};

// function validUsername(body, res) {
//   if (!_.has(body, "username") && !_.isString(body.username)) {
//     return res.send({
//       code: 400,
//       message: "Oops! Looks like you need to add a valid username!"
//     });
//   }
// }

// function validEmail(body, res) {
//   if (
//     (!_.has(body, "email") && !_.isString(body.email)) ||
//     !validateEmail(body.email)
//   ) {
//     return res.status(400).send({
//       code: 400,
//       message: "Oops! Looks like you need to add a valid email!"
//     });
//   }
// }

// function validPassword(body, res) {
//   if (!_.has(body, "password") && !_.isString(body.password)) {
//     return res.status(400).send({
//       code: 400,
//       message: "Oops! Looks like you need to add a valid password!"
//     });
//   }
// }
