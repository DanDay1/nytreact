// Require Node Modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan'); // for debugging



// Initialize Express for debugging and body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));


// Serve Static Content
app.use(express.static(process.cwd() + '/public'));

// Database configuration with Mongoose:
// mongoose.connect('mongodb://localhost/nytreact');

//mongoose.connect( 'mongodb://heroku_h4vhhl2w:8q6mj3hr9k1s0k46tklor55euh@ds251845.mlab.com:51845/heroku_h4vhhl2w');

mongoose.Promise = global.Promise; //added this line in for the new db. 
mongoose.connect( 'mongodb+srv://user100:user100@cluster0.iivt7.mongodb.net/NYTDatabase?retryWrites=true&w=majority' );
var db = mongoose.connection;

// Show Mongoose errors
db.on('error', function(err) {
    console.log('Mongoose Error: ', err);
});

// Log success message once logged into db
db.once('open', function() {
    console.log('Mongoose connection successful.');
});

// Import Article model
var Article = require('./models/Article.js');



// Import Routes/Controller
var router = require('./controllers/controller.js');
app.use('/', router);



// Launch App
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Running on port: ' + port);
});