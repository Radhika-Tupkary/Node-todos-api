const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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
  user.tokens = user.tokens.concat([{access,token}]);
  console.log(user);
  return user.save().then(() => {
    return token
  });
}

let User = mongoose.model('User', UserSchema);

module.exports = {User};


/*
Using built-in function from validator library to validate email address
Tokens is not available on MySQL and Postgre databases but only on Mongodb
With UserSchema.methods - you can add INSTANCE methods which have access to individual documents

*/
