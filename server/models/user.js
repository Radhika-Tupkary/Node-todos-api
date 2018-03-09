const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = mongoose.Schema({
  email : {
    type: String,
    required:true,
    trim:true,
    minlength: 1,
    unique:true,
    validate:{
      validator:validator.isEmail,
      message:'{value} is not a valid email!'
    }
  },
  password : {
    type:String,
    required:true,
    minlength:6
  },
  tokens: [{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {  // not using ARROW function here because arrow functions do not bind this keyword
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id:user._id.toHexString(), access}, 'pqr987').toString();
  user.tokens.push({access,token});
  // user.tokens = user.tokens.concat[{access,token}];
  return user.save().then(() => {
    return token
  });
};

UserSchema.methods.removeToken = function(token) {
  let user = this;
  return user.update({
    $pull: {
      tokens:{
        token
      }
    }
  });
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'pqr987');
  } catch(e) {
    return new Promise((resolve, reject) => {
      reject();
    })
  }

  return User.findOne({
    '_id':decoded._id,
    'tokens.token': token,
    'tokens.access':'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject('Email address not found in the database');
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
          resolve(user);
        } else {
          reject('Incorrect password');
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
let user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
      });
    })
  } else {
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};


/*
Using built-in function from validator library to validate email address
Tokens is not available on MySQL and Postgre databases but only on Mongodb
With UserSchema.methods - you can add INSTANCE methods which have access to individual documents

*/
