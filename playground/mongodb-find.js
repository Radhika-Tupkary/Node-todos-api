// const MongoClient = require('mongodb').MongoClient;   //ES5 old way

const {MongoClient, ObjectID} = require('mongodb');   // ES6 object destructuring

console.log(new ObjectID());

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  // In Mongodb, a db (TodoApp) does not have to exist before it is used.
  // If the db does not exist, it gets created on the fly through MongoClient.connect()

    if (err) {
        return console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to mongodb server");

    db.collection('Todos').find().toArray().then((docs) => {
      console.log(`docs : ${JSON.stringify(docs, undefined, 2)}`);
    }, (err) => {
      console.log(`error occured while fetching documents ${err}`);
    });

    // db.close();
});

































// const MongoClient = require('mongodb').MongoClient;
//
// MongoClient.connect('mongodb://localhost:27017/NewDB', (err, db) => {
//   db.collection('New collection').insertOne({age:101, profession: "magician", job: "healing"}, (err, res) => {
//     if(err) {
//       return console.log(`Could not insert given document, please try again later`);
//     }
//     console.log(JSON.stringify(res.ops, undefined, 2));
//   });
//
//   db.close();
//
//
//
// });
