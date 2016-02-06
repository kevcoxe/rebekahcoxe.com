var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;


/*========================
 * Connections
 *
 **/

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("connected to database");
});

/*========================
 * Schemas
 *
 **/

// Post schema
var postSchema = mongoose.Schema({
    user_id: String,
    title: String,
    content: String
});

postSchema.methods.speak = function () {
    var greeting = this.title
        ? "My title is " + this.title
        : "I do not have a title";
    console.log(greeting);
};

// User schema
var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String
});


/*========================
 * Models
 *
 **/

var Post = mongoose.model("Post", postSchema);
var User = mongoose.model("User", userSchema);


/*========================
 * Exports
 *
 **/

module.exports = {
    schemas: {
        testSchema: postSchema
    },
    models: {
        Post: Post,
        User: User
    },
    mongoose: mongoose,
    db: db
};
