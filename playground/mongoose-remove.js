const { mongoose } = require("../server/db/mongoose");
const { ObjectID } = require("mongodb");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

Todo.findByIdAndDelete("5bcf847749ddc03128cf5f28").then(doc => {
  console.log(doc);
});
