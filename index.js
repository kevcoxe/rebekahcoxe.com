var express = require('express');
var app = express();

var schemas = require("./db_stuff/dbInfo.js").schemas;
var models = require("./db_stuff/dbInfo.js").models;
var mongoose = require("./db_stuff/dbInfo.js").mongoose;
var db = require("./db_stuff/dbInfo.js").db;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


/************************
 * passport
 *
 */

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  },
  function(username, password, done) {
    models.User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


/*
 *
 *
 ***********************/


// bodyparser
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

// handling 404 errors
app.use(function(err, req, res, next) {
    if(err.status !== 404) {
        return next();
    }

    // let angular handle 404
    res.redirect("/#/404");
});


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

    console.log("\n\nThis is the post:", JSON.stringify(input, null, "  "));

    models.Picture.findOne({title: "default"})
        .exec(function (err, picture) {
            var tempPost = new models.Post({
                owner: input.user_id,
                tag: input.tag,
                title_image: picture._id,
                title: input.title || "test title",
                content: input.content || "default content"
            });

            tempPost.save(function (err, tempPost) {
                if (err) console.log(err);
                if (!err) {
                    models.Post.find({})
                        .populate("owner")
                        .populate("title_image")
                        .exec(function (err, posts) {
                            console.log(JSON.stringify(posts, null, "  "))
                        })
                }
                console.log(tempPost);
            });

            res.end(JSON.stringify(tempPost));
        });

});

app.post("/getPosts", function (req, res) {

    models.Post.find({}, function (err, posts) {
        res.send(posts);
    })
    .populate("owner")
    .populate("tag")
    .populate("title_image");

});

app.post("/getTagedPosts", function (req, res) {

    var r = req.body;

    models.Post.find(r, function (err, posts) {
        res.send(posts);
    })
    .populate("owner")
    .populate("tag")
    .populate("title_image");

});


app.post("/getTags", function (req, res) {

    models.Tag.find({}, function (err, tags) {
        res.send(tags);
    });

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
