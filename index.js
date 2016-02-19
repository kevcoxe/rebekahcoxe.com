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


app.post("/newPost", function (req, res) {
    var input = req.body;
    models.User.findOne({email: input.email}, function (err, user) {
        if (err) console.log(err);

        console.log("\n\nUser " + user.first_name + " id: " + user._id + "\n\n");
        console.log(input.email);
        var p = {
            user_id: user._id,
            title: input.title ? input.title : "",
            content: input.content ? input.content : ""
        };

        console.log(p);

        var tempPost = new models.Post(p);

        tempPost.save(function (err, tempPost) {
            if (err) console.log(err);
            console.log(tempPost);
        });

        res.end(JSON.stringify(tempPost));
    });
});

app.post("/getPosts", function (req, res) {

    models.Post.find({}, function (err, posts) {
        res.send(posts);
    });

});


app.post("/getUser", function (req, res) {

    models.User.findOne({email: "rkcoxe@gmail.com"}, function (err, user) {
        console.log(user);
        res.send(user);
    });

});

var server = app.listen(3999, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
