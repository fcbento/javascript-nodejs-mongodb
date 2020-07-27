const mongoose = require('mongoose');
const {secret} = require('./secret')

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${secret.user}:${secret.password}@${secret.base}.mlab.com:35658/todo`);

module.exports = { mongoose }