//     FAVICON GENERATOR
//     Copyright (C) 2014  Ilias Ismanalijev

//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU Affero General Public License as
//     published by the Free Software Foundation, either version 3 of the
//     License, or (at your option) any later version.

//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU Affero General Public License for more details.

//     You should have received a copy of the GNU Affero General Public License
//     along with this program.  If not, see http://www.gnu.org/licenses/


"use strict";

var jade = require("jade");
var express = require('express');
var app = express();

var fs = require("fs");
var cp = require('child_process');


// Configuration
app.use(express.compress());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/tmp/images' }));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/img'));


// Routes
// - Home
app.get('/', function (req, res) {
	res.render("index");
});

// Start logging
app.use(express.logger("dev"));

// Download Zipfile
app.get("/zip/:zip", function (req, res) {
	var zip = req.params.zip;
	res.download(__dirname + "/tmp/zip/" + zip, zip, function (err) {
		if (err) {
			if (err.status === 404) {
				res.render("error", {
					text: "Something went wrong, try again!"
				});
			}
		} else {
			fs.unlink(__dirname + "/tmp/zip/" + zip);
		}
	});
});

// Methods

function Favicon(file, fileCallback, errorCallback) {
	var _name = file.path,
		name = _name.substr((__dirname + "/tmp/images/").length),
		pathname = _name.substr((__dirname + "/tmp/images/").length, name.length - 4),
		fileName = __dirname + "/tmp/processing/" + pathname + "/" + name;

	var OK = 0,
		ERR_NO_IMAGEMAGICK = 1,
		ERR_NO_SOURCE = 2,
		ERR_NOT_IMAGE = 3;

	var makeDir = function (pathname) {
		fs.mkdir(__dirname + "/tmp/processing/" + pathname, moveFile);
	};

	var moveFile = function () {
		fs.rename(__dirname + "/tmp/images/" + name, fileName, makeIcons);
	};

	var makeIcons = function () {
		var sh = cp.spawn("sh", [__dirname + "/webicon.sh", fileName, __dirname + "/tmp/processing/" + pathname]);
		sh.on("close", afterMake);
	};

	var afterMake = function (code) {
		switch (code) {
			case OK: 
				moveZip();
				break;
			case ERR_NOT_IMAGE: 
				badMake("Wrong filetype");
				break;
			case ERR_NO_SOURCE:
				badMake("No file found");
				break;
			case ERR_NO_IMAGEMAGICK:
				badMake("You need ImageMagick installed");
				break;
			default:
				badMake("Server Error");
		}
	};

	var badMake = function (message) {
		console.log("ERROR > ", message);
		errorCallback(message);
		removeDir();
	};

	var moveZip = function () {
		fs.rename(__dirname + "/tmp/processing/" + pathname + "/favicon.zip", __dirname + "/tmp/zip/" + pathname + ".zip", finishUp);
	};

	var finishUp = function () {
		fileCallback(pathname);
		removeDir();
	};

	var removeDir = function () {
		fs.unlink(__dirname + "/tmp/processing/" + pathname + "/" + name, function () {
			fs.rmdir(__dirname + "/tmp/processing/" + pathname);
		});
	};

	// makeDir -> moveFile -> makeIcons -> afterMake -> moveZip -> finishUp -> removeDir
	makeDir(pathname, moveFile);
}


var sendFile = function (res) {
	return function (pathname) {
			res.send({
				"zip": "/zip/" + pathname + ".zip"
			});
		};
};

var errorFile = function (res) {
	return function (message) {
			res.send({
				"error": message
			});
		};
};

var processFiles = function (req, res) {
	for (var i = req.files.files.length - 1; i >= 0; i--) {
		new Favicon(
			req.files.files[i], // File
			sendFile(res), // onSuccess
			errorFile(res) // onError
		);
	}
};

// Process sent file
app.post('/process', processFiles);
app.post('/zip/process', processFiles);

app.get(/.*/, function (req, res) {
	res.redirect("/");
});

app.listen(4007);
console.log("listening on 4007");