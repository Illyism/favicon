
var jade = require("jade");
var express = require('express');
var app = express();

var fs = require("fs");

var cp = require('child_process');

app.use(express.compress());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname+'/tmp/images' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/app'));

app.get('/', function (req, res) {
	res.render("index");
});
app.use(express.logger("dev"));
//app.use("/zip", express.static(__dirname + '/tmp/zip'));
app.get("/zip/:zip", function(req, res) {
  var zip = req.params.zip;
  res.download(__dirname+"/tmp/zip/"+zip, zip, function() {
    fs.unlink(__dirname+"/tmp/zip/"+zip);
  });
})


app.post('/process', function (req, res) {
  for (var i = req.files.files.length - 1; i >= 0; i--) {
    var file = req.files.files[i];
    var _name = file.path;
    var name = _name.substr((__dirname+"/tmp/images/").length);
    var pathname = _name.substr((__dirname+"/tmp/images/").length, name.length-4);
    // Making directory
    fs.mkdir(__dirname+"/tmp/processing/"+pathname, function() {
      // Moving files
      var fileName = __dirname+"/tmp/processing/"+pathname+"/"+name;
      fs.rename(__dirname+"/tmp/images/"+name, fileName, function() {
        var sh = cp.spawn("sh", [__dirname+"/webicon.sh", fileName, __dirname+"/tmp/processing/"+pathname]);
        sh.on('close', function (code) {
          console.log('child process exited with code ' + code);
          if (code === 0) {
            fs.rename(__dirname+"/tmp/processing/"+pathname+"/favicon.zip", __dirname+"/tmp/zip/"+pathname+".zip", function() {
              res.send({"zip": "/zip/"+pathname+".zip"});
              fs.unlink(__dirname+"/tmp/processing/"+pathname+"/"+name, function() {
                fs.rmdir(__dirname+"/tmp/processing/"+pathname);
              });
            })
          }
        });
      })
    });
  };
});

app.listen(4007);
console.log("listening on 4007")
