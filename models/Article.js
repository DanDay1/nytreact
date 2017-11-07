// Require Mongoose
var mongoose = require('mongoose');

// Create Schema class
var Schema = mongoose.Schema;

// Create Article schema
var ArticleSchema = new Schema({

    // Title of Article
    title: {
        type: String,
        required: true
    },

    // Date of Article
    date: {
        type: String,
        required: true
    },

    // Link to Article
    url: {
        type: String,
        required: true
    }

});

// Create Article model with Mongoose
var Article = mongoose.model('Article', ArticleSchema);

// Export model
module.exports = Article;