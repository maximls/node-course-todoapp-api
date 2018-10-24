var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
var { ObjectID } = require("mongodb");
var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc => res.send(doc), err => res.status(400).send(err));
  console.log(req.body);
});

app.get("/todos", (req, res) => {
  Todo.find().then(todos => res.send({ todos }), e => res.status(400).send(e));
});

app.get("/todos/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }

  Todo.findById(req.params.id).then(
    todo => {
      if (todo) {
        res.status(200).send({ todo });
      } else {
        res.status(400).send("Id Not Found");
      }
    },
    e => res.status(400).send(e)
  );
});

app.delete("/todos/:id", (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("Invalid ID");
  }

  Todo.findByIdAndDelete(id).then(
    todo => {
      if (!todo) {
        res.status(404).send();
      } else {
        res.status(200).send({ todo });
      }
    },
    err => {
      res.status(400);
    }
  );
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = { app };
