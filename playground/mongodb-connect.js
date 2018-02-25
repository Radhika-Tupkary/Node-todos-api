// const MongoClient = require('mongodb').MongoClient;   //ES5 old way

const {MongoClient, ObjectID} = require('mongodb');   // ES6 object destructuring

console.log(new ObjectID());

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to mongodb server");

    db.collection('todos').insertMany([
  { text: 'eat breakfast'},
  { text: 'prepare for interviews',
    completed: true },
  { text: 'call home'}], (err, res) => {
        if (err) {
            return console.log("Unable to insert todo", err);
        }
        console.log(JSON.stringify(res.ops, undefined, 2));

    });

    // db.collection('Users').insertOne({age:2, name:"Jr. Mahajan", location: "India"}, (error, result) => {
    //     if(error){
    //         return console.log("Could not insert doc", error);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
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
