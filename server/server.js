const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);

  let todoSample = new Todo({
    text:req.body.text
  });

  todoSample.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.listen(3000, (req, res) => {
  console.log(`server is up and running on port 3000!`);
});

module.exports = {app};
