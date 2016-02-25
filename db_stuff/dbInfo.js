var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

var ObjectId = mongoose.Schema.Types.ObjectId;

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
    owner: {
        type: ObjectId,
        ref: "User"
    },
    title_image: {
        type: ObjectId,
        ref: "Picture"
    },
    tag: {
        type: ObjectId,
        ref: "Tag"
    },
    title: {type: String, default: "Default title"},
    content: {type: String, default: "Default content"},
    coments: [String],
    date_created: { type: Date, default: Date.now }
});

// User schema
var userSchema = mongoose.Schema({
    first_name: {type: String, default: "John"},
    last_name: {type: String, default: "Doe"},
    email: {type: String, default: "test@tester.com"},
    bio: {type: String, default: "Default bio"},
    profile_pic: {
        type: ObjectId,
        ref: "Picture"
    },
});

// Picture schema
var pictureSchema = mongoose.Schema({
    title: {type: String, default: "default"},
    location: {type: String, default: "/images/defualt.png"},
    size: {type: String, default: "200x200"}
});

// Tag schema
var tagSchema = mongoose.Schema({
    title: {type: String, default: "life"}
});


/*========================
 * Models
 *
 **/

var Post = mongoose.model("Post", postSchema);
var User = mongoose.model("User", userSchema);
var Picture = mongoose.model("Picture", pictureSchema);
var Tag = mongoose.model("Tag", tagSchema);


/*========================
 * Exports
 *
 **/

module.exports = {
    schemas: {
        postSchema: postSchema,
        userSchema: userSchema,
        pictureSchema: pictureSchema,
        tagSchema: tagSchema
    },
    models: {
        Post: Post,
        User: User,
        Picture: Picture,
        Tag: Tag
    },
    mongoose: mongoose,
    db: db
};
