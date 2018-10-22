const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/",
  { useNewUrlParser: true },
  (error, client) => {
    if (error) return console.log("Unable to connect to DB server");
    console.log("Connected to MongoDB server");

    const db = client.db("TodoApp");

    db.collection("Users")
      .findOneAndUpdate(
        { user: "max" },
        { $inc: { age: +1 } },
        { returnOriginal: false }
      )
      .then(
        result => console.log(result),
        error => {
          console.log(error);
        }
      );

    client.close();
  }
);
