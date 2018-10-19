const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to DB server");
    console.log("Connected to MongoDB server");

    const db = client.db("TodoApp");

    // db.collection("Todos")
    //   .find({
    //     _id: new ObjectID("5bca0a50e1b24a1e5c9d601b")
    //   })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log("Todos");
    //       console.log(JSON.stringify(docs, undefined, 2));
    //     },
    //     err => {
    //       console.log("Cannot get todos");
    //     }
    //   );

    db.collection("Users")
      .find({ user: "max" })
      .count()
      .then(
        docs => {
          console.log("Todos");
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          console.log("Cannot get todos");
        }
      );

    //console.log(results);

    client.close();
  }
);
