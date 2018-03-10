const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');
const bcrypt = require('bcryptjs');
require('./config/config');

const _ = require('lodash');

const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT;
let app = express();

app.use(bodyParser.json());      // middleware to fetch json data from body of POST

app.post('/todos', authenticate, (req, res) => {
  let todoSample = new Todo({
    text:req.body.text,
    _creator: req.user._id
  });

  todoSample.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({_creator:req.user._id}).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {

  if(!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }

  Todo.findOne({_id:req.params.id, _creator:req.user._id}).then((todo) => {
    if(!todo){                          // means there is no todo
      return res.status(404).send();
    }
    res.send({todo});
  }, (e) => {
    res.status(400).send();
  }).catch((e) => console.log(e));
});

app.delete('/todos/:id', authenticate, (req, res) => {

  if(!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({_id:req.params.id,_creator:req.user._id}).then((todo) => {
    if(!todo){                          // means there is no todo
      return res.status(404).send();
    }
    res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  });

});

app.patch('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, ['text', 'completed']);   // making sure that user does not update anything other than text and completed

  if(!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed  = false;
    body.completedAt = null;
  }
  let query = { _id:req.params.id , _creator: req.user._id };

  Todo.findOneAndUpdate(query, {$set:body}, {new: true}).then((todo) => {

    if(!todo){                          // means todo does not exist
      return res.status(401).send();
    }

    res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.get('/users/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id)) {
    return res.send('Id not valid');
  }

  User.findById(req.params.id).then((user) => {
    if(!user){
      return res.status(404).send('Id not found');
    }
    res.send({user});
  }, (e) => {
    res.status(400).send(e);
  }).catch((e) => console.log(e));
});

app.post('/users', (req, res) => {

  let body = _.pick(req.body, ['email', 'password']);
  let user = new User({email:body.email, password:body.password});

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });

});

app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => res.status(400).send(e));

});

app.delete('/users/me/token', authenticate, (req, res) => {
  let user = req.user;
  user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, (e) => {
    res.status(400).send()
  });
});

app.listen(port, (req, res) => {
  console.log(`server is up and running on port ${port}!`);
});

module.exports = {app};
