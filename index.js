var express = require('express');
var app = express();

var schemas = require("./db_stuff/dbInfo.js").schemas;
var models = require("./db_stuff/dbInfo.js").models;
var mongoose = require("./db_stuff/dbInfo.js").mongoose;
var db = require("./db_stuff/dbInfo.js").db;



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


app.post("/createPost", function (req, res) {
    var input = req.body;

    var tempPost = new models.Post({
        owner: input.user_id,
        title: input.title || "test title",
        content: input.content || "default content"
    });

    tempPost.save(function (err, tempPost) {
        if (err) console.log(err);
        if (!err) {
            models.Post.find({})
                .populate("owner")
                .exec(function (err, posts) {
                    console.log(JSON.stringify(posts, null, "  "))
                })
        }
        console.log(tempPost);
    });

    res.end(JSON.stringify(tempPost));
});

app.post("/getPosts", function (req, res) {

    models.Post.find({}, function (err, posts) {
        res.send(posts);
    }).populate("owner");

});



app.post("/getUser", function (req, res) {

    models.User.findOne({email: "rkcoxe@gmail.com"}, function (err, user) {
        console.log(user);
        res.send(user);
    });

});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
