var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/TodoApp",
  { useNewUrlParser: true }
);

var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

var newTodo = new Todo({
  text: " Eat lunch "
});

var User = mongoose.model("User", {
  email: {
    type: String,
    reuired: true,
    minlength: 1,
    trim: true
  }
});

var max = new User({
  email: "max@test.com "
});

max.save().then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);

newTodo.save().then(
  doc => {
    console.log("Saved todo", doc);
  },
  e => {
    console.log("Unable to save Todo", e);
  }
);
