<h1 align="center">
  <br>
  <img width="450" src="https://cloud.githubusercontent.com/assets/304283/8266610/51c952f4-1727-11e5-907b-e6ff3faf87a5.png" alt="favicon generator">
  <br>
  <br>
</h1>

> Icons for the web

## Requirements

The server runs on Node.js. You also need NPM.

You need ImageMagick and zip installed. So this app works anywhere.

APT:

    sudo apt-get install imagemagick zip
    
[Homebrew](http://brewformulas.org/Imagemagick):

    brew install imagemagick zip
    
[Chocolatey](http://chocolatey.org/packages?q=imagemagick):

    choco install imagemagick zip

## Installation

Clone this repository and run **NPM install**. Then run the server using **node app**.

    npm install
    node app

## Usage

The processing happens in the **/tmp/** directory. Images are uploaded to **/tmp/images/** and processed in **/tmp/processing/**, then the zip files are **/tmp/zip/**. After a successful download, everything is cleaned.

# License

Copyright © 2014-2015 Ilias Ismanalijev

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

[tl;dr](http://www.tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)
