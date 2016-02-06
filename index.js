var express = require('express');
var app = express();

var schemas = require("./db_stuff/schemas.js").schemas;
var models = require("./db_stuff/schemas.js").models;
var mongoose = require("./db_stuff/schemas.js").mongoose;
var db = require("./db_stuff/schemas.js").db;


// --------------------------------------------

//var Post = mongoose.model("Post", testSchema);
//
//var firstPost = new Post({
//    title: "first post!",
//    content: "This is my first blog post to see how it works"
//});
//firstPost.speak();
//
//firstPost.save(function (err, firstPost) {
//    if (err) console.log(err);
//    firstPost.speak();
//});



// --------------------------------------------

// bodyparser
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
});


app.post("/info", function (req, res) {

    response = {
        message: "hello there this is info"
    };

    console.log(response);

    res.end(JSON.stringify(response));
});

app.post("/input", function (req, res) {
    var input = req.body;
    console.log(input.message);
    res.end("thanks");
});


app.post("/newPost", function (req, res) {
    var input = req.body;
    var tempPost = new models.Post({
        title: input.title ? input.title : "",
        content: input.content ? input.content : ""
    });

    tempPost.save(function (err, tempPost) {
        if (err) console.log(err);
        console.log(tempPost);
    });

    res.end(JSON.stringify(tempPost));
});

app.post("/getPosts", function (req, res) {

    models.Post.find({}, function (err, posts) {
        console.log(posts);
        res.send(posts);
    });

});

var server = app.listen(3999, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
