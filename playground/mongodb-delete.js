const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  console.log(`successfullly connected to the database TodoApp`);

  // db.collection('Users').deleteOne({completed:false}).then((res) => {
  //   console.log(`${res.deletedCount} documents deleted`);
  // })

  db.collection('Users').findOneAndDelete({_id:123}).then((result) => {
    console.log(`deleted a document: ${JSON.stringify(result, undefined, 2)}`)
  }, (err) => {
    console.log(`error occurred while deleting a document`);
  });
});


/*
Notes:
1. deleteMany
2.deleteOne - this works exactly like deleteMany but it stops after it sees a first match
3. findOneAndDelete - works exactly like deleteOne and in addition it returns a deleted object ->
"lastErrorObject": {
    "n": 0
  } tells how many objects were deleted. n=0 means none were deleted (mostly because object with matching condition did not exist.)
4. at the end of all these methods, you can OPTIONALLY either use a promise by using .then() or use a callback function.
*/
