require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { ObjectID } = require("mongodb");
const port = process.env.PORT;

const app = express();

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
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    res.status(404).send("Invalid ID");
  }

  Todo.findById(req.params.id)
    .then(todo => {
      if (todo) {
        res.status(200).send({ todo });
      } else {
        res.status(400).send("Id Not Found");
      }
    })
    .catch(e => res.status(400).send(e));
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

app.patch("/todos/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectID.isValid(id)) {
    res.status(404).send("Invalid ID");
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(
    id,
    {
      $set: body
    },
    {
      new: true
    }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(err => res.status(400).send());
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = { app };
