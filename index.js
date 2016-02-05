var express = require('express');
var app = express();
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

var server = app.listen(3999, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});
