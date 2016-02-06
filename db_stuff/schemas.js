var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("connected to database");
});

var testSchema = mongoose.Schema({
    title: String,
    content: String
});

testSchema.methods.speak = function () {
    var greeting = this.title
        ? "My title is " + this.title
        : "I do not have a title";
    console.log(greeting);
};

var Post = mongoose.model("Post", testSchema);

module.exports = {
    schemas: {
        testSchema: testSchema
    },
    models: {
        Post: Post
    },
    mongoose: mongoose,
    db: db
};
