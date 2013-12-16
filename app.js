
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var jade = require("jade");
var express = require('express');
var app = express();

var fs = require("fs");

var cp = require('child_process');

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  
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
      fs.unlink(__dirname+"/tmp/zip/"+zip, function() {
        console.log(zip, "deleted");
      });
    });
  })


  app.post('/process', function (req, res) {
    for (var i = req.files.files.length - 1; i >= 0; i--) {
      var file = req.files.files[i];
      var _name = file.path;
      var name = _name.substr(11)
      var pathname = _name.substr(11, name.length-4);
      // Making directory
      console.log("making directory");
      fs.mkdir(__dirname+"/tmp/processing/"+pathname, function() {
        console.log("made directory");
        // Moving files
        var fileName = __dirname+"/tmp/processing/"+pathname+"/"+name;
        console.log(__dirname+"/"+file.path);
        fs.rename(__dirname+"/"+file.path, fileName, function() {
          console.log("starting");
          var sh = cp.spawn("sh", [__dirname+"/webicon.sh", fileName, __dirname+"/tmp/processing/"+pathname]);
          sh.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
          });

          sh.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
          });

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
  console.log(cluster.worker.id, "listening on 4007")

}