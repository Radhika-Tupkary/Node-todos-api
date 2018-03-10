const mongoose = require('mongoose');
require('./../config/config');

mongoose.connect(process.env.MONGODB_URI);

mongoose.Promise = global.Promise;
module.exports = {mongoose};
