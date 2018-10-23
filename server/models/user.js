var mongoose = require("mongoose");

var User = mongoose.model("User", {
  email: {
    type: String,
    reuired: true,
    minlength: 1,
    trim: true
  }
});

module.exports = { User };
