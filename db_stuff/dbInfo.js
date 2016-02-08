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
    title: String,
    content: String,
    coments: [String],
    date_created: { type: Date, default: Date.now }
});

// User schema
var userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    bio: String,
    profile_pic: String
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
