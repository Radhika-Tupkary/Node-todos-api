// const MongoClient = require('mongodb').MongoClient;   //ES5 old way

const {MongoClient, ObjectID} = require('mongodb');   // ES6 object destructuring

console.log(new ObjectID());

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log("Unable to connect to mongodb server");
    }
    console.log("Connected to mongodb server");

    db.collection('Todos').insertMany([
  { item: "canvas",
    qty: 100,
    size: {h: 28, w: 35.5, uom: "cm"},
    status: "A"},
  { item: "journal",
    qty: 25,
    size: {h: 14, w: 21, uom: "cm"},
    status: "A"},
  { item: "mat",
    qty: 85,
    size: {h: 27.9, w: 35.5, uom: "cm"},
    status: "A"},
  { item: "mousepad",
    qty: 25,
    size: {h: 19, w: 22.85, uom: "cm"},
    status: "P"},
  { item: "notebook",
    qty: 50,
    size: {h: 8.5, w: 11, uom: "in"},
    status: "P"},
  { item: "paper",
    qty: 100,
    size: {h: 8.5, w: 11, uom: "in"},
    status: "D"},
  { item: "planner",
    qty: 75,
    size: {h: 22.85, w: 30, uom: "cm"},
    status: "D"},
  { item: "postcard",
    qty: 45,
    size: {h: 10, w: 15.25, uom: "cm"},
    status: "A"},
  { item: "sketchbook",
    qty: 80,
    size: {h: 14, w: 21, uom: "cm"},
    status: "A"},
  { item: "sketch pad",
    qty: 95,
    size: {h: 22.85, w: 30.5, uom: "cm"},
    status: "A"}
], (err, res) => {
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
