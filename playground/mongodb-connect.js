const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to DB server");
    console.log("Connected to MongoDB server");

    const db = client.db("TodoApp");

    // db.collection("Todos").insertOne(
    //   {
    //     text: "something to do2",
    //     completed: false
    //   },
    //   (err, result) => {
    //     if (err) return console.log("error saving record", err);
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //   }
    // );

    // db.collection("Users").insertOne(
    //   {
    //     user: "max",
    //     age: 43,
    //     location: "canada"
    //   },
    //   (error, result) => {
    //     if (error) return console.log("error saving record", err);
    //     console.log(
    //       JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)
    //     );
    //   }
    // );

    client.close();
  }
);
