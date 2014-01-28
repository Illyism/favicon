favicon
=======

Favicon Generator using Node.js and Imagemagick

## Requirements

The server runs on Node.js. You also need NPM.

You need ImageMagick installed. So this app only works on Linux or OS X.

'''shell
	sudo apt-get install imagemagick
'''

## Installation

Clone this repository and run **NPM install**. Then run the server using **node app**.

'''shell
	npm install
	node app
'''

## Usage

The processing happens in the **/tmp/** directory. Images are uploaded to **/tmp/images/** and processed in **/tmp/processing/**, then the zip files are **/tmp/zip/**. After a successful download, everything is cleaned.

# License

Copyright © 2014 Ilias Ismanalijev

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

[tl;dr](http://www.tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)