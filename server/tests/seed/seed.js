const { ObjectID } = require("mongodb");
const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/user");
const jwt = require("jsonwebtoken");

const todos = [
  { _id: new ObjectID(), text: "Test todo one" },
  {
    _id: new ObjectID(),
    text: "Test todo two",
    completed: true,
    completedAt: 343
  }
];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: "max@test.com",
    password: "userone",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "test@test.com",
    password: "usertwo"
  }
];

const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => {
      //console.log("Creating Todos....");
      Todo.insertMany(todos);
    })
    .then(() => {
      //console.log("Created Todos... calling DONE");
      done();
    });
};

const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      //console.log("Inserting...");
      User(users[0]).save();
      User(users[1]).save();
    })
    .then(() => {
      //console.log("Inserted... calling DONE");
      done();
    });
};

module.exports = { populateTodos, todos, populateUsers, users };
