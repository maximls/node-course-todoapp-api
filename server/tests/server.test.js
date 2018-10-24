const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");

const todos = [
  { _id: new ObjectID(), text: "Test todo one" },
  {
    _id: new ObjectID(),
    text: "Test todo two",
    completed: true,
    completedAt: 343
  }
];

beforeEach(done => {
  Todo.deleteMany({})
    .then(() => {
      Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  it("should create a new todo", done => {
    var text = "testing data";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(3);
            expect(todos[2].text).toBe(text);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 400 if id not found", done => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(400)
      .end(done);
  });

  it("should return 404 if id is not valid", done => {
    var hexId = 123;
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should delete todo doc by id", done => {
    let id = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, response) => {
        if (err) return done(err);

        Todo.findById(`${id}`)
          .then(todo => {
            expect(todo).toNotExist();
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  it("should return 400 if id not found", done => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 if id is not valid", done => {
    var hexId = 123;
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
});

describe("PATCH /patch/:id", () => {
  it("should update a todo", done => {
    let id = todos[0]._id.toHexString();
    let updateText = "this is updated text from the test!";

    request(app)
      .patch(`/todos/${id}`)
      .send({ text: updateText, completed: true })
      .expect(200)
      .expect(response => {
        expect(response.body.todo.text).toBe(updateText);
        expect(response.body.todo.completed).toBe(true);
        expect(response.body.todo.completedAt).toBeA("number");
      })
      .end(done);
  });

  it("should clear completedAt when todo is not completed", done => {
    let id = todos[1]._id.toHexString();
    let updateText = "this is updated text from the second test!";

    request(app)
      .patch(`/todos/${id}`)
      .send({ text: updateText, completed: false })
      .expect(200)
      .expect(response => {
        expect(response.body.todo.text).toContain(updateText);
        expect(response.body.todo.completed).toBe(false);
        expect(response.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
