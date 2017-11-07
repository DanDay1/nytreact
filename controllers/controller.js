// Node Dependencies
var express = require('express');
var router = express.Router();


// Import Article model
var Article = require('../models/Article.js');



// Main GET: will display ReactJS application
router.get("/", function(req, res) {
    res.sendFile(process.cwd() + "/public/index.html");
});

// API GET: components will use this to query MongoDB for all saved articles
router.get("/api/saved", function(req, res) {

    // Query Mongo for Articles
    Article.find({}, function(err, docs) {
        // log errors
        if (err) {
            console.log(err);
        }
        // or send doc to browser as a json object
        else {
            res.json(docs);
        }
    });

});


// API POST: components will use this to save article to database
router.post("/api/saved", function(req, res) {

    // Using Article model, create new entry ("req.bidy" object has same key-value pairs as model)
    var entry = new Article(req.body);

    // Save entry to MongoDB
    entry.save(function(err, doc) {
        // log errors
        if (err) {
            console.log(err);
            res.sendStatus(400);
        }
        // or log doc that was saved to the DB
        else {
            console.log(doc);
            res.sendStatus(200);
        }
    });

});


// API DELETE: components will use this to delete saved article in the database
router.post("/api/delete/:articleMongoId", function(req, res) {
    console.log(req.params.articleMongoId)
    Article.findByIdAndRemove(req.params.articleMongoId, function(err, todo) {
        if (err) {
            // Send Failure header
            console.log(err);
            res.sendStatus(400);
        } else {
            // Send Success header
            res.sendStatus(200);
        }
    });

});


// CATCH ALL "*" (this redirect user to the "/" route for any unknown cases)
router.get("*", function(req, res) {
    res.redirect("/");
});


// ================================
// Export Router to Server.js
module.exports = router;