var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/:27017/chatset-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Nos conectamos');
});


module.exports = db;