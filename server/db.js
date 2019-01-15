const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatsetDB');
mongoose.Promise = global.Promise;

const db = mongoose.connection;

// If exists an error  
db.on('error', console.error.bind(console, 'connection error:'));

// Nothing errors
db.once('open', function() {
    console.log('Database Connected!');
});
