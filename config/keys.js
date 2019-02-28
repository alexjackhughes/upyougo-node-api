// In real app wouldn't share dev.js keys, but so you can connect to database

if (process.env.NODE_ENV !== "production") {
  module.exports = require("./dev");
}
