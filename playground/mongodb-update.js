const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  console.log(`connected to the database`);

  db.collection('Todos').updateOne({item:"canvas"}, {$mul: {qty:2}});


});

/* Notes
1. updateOne() -
2.updateMany() -
3. replaceOne() -
4. findOneAndUpdate() -
*/
