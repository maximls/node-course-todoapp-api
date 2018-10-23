const { mongoose } = require("./../server/db/mongoose");
const { ObjectID } = require("mongodb");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

var id = "5bcf417d9654e227a4392ce6";
if (!ObjectID.isValid(id)) {
  console.log("invalid ID");
}

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log("Todos: " + todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log("Todo: " + todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("ID not found");
//     }
//     console.log("Todo by ID: " + todo);
//   })
//   .catch(err => console.log(err));

User.findById("5bce2433592f7021f47dcdbd")
  .then(user => {
    if (!user) {
      return console.log("Coulnd't find user");
    }
    console.log(user);
  })
  .catch(err => console.log(err));
