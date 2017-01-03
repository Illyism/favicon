#!/usr/bin/env bash

######################################
# INITIALIZE VARS

CONVERT_CMD=`which convert`
SRC_IMAGE=$1
PWD=$2
TRANSPARENT_COLOUR="#FFFFFF"
IMAGE_NAME="favicon"

ERR_NO_IMAGEMAGICK=1
ERR_NO_SOURCE=2
ERR_NOT_IMAGE=3

######################################
# REQUIREMENTS

echo "MAKING > $SRC_IMAGE";

if [ -z $CONVERT_CMD ] || [ ! -f $CONVERT_CMD ] || [ ! -x $CONVERT_CMD ];
then
    echo "ImageMagick needs to be installed to run this script"
    exit $ERR_NO_IMAGEMAGICK;
fi

if [ -z $SRC_IMAGE ];
then
    echo "You must supply a source image as the argument to this command."
    exit $ERR_NO_SOURCE;
fi

if [ ! -f $SRC_IMAGE ];
then
    echo "Source image \"$SRC_IMAGE\" does not exist."
    exit $ERR_NO_SOURCE;
fi


generate_png() {
    local SIZE=$1
    local SOURCE=$2

    if [ -z "$SOURCE" ]; then
        SOURCE="$PWD/$IMAGE_NAME-256.png"
    fi

    if [ ! -f $SOURCE ]; then
        SOURCE="$PWD/$IMAGE_NAME-256-0.png"
    fi

    if [ ! -f $SOURCE ];
    then
        echo "Could not find the source image $SOURCE"
        exit $ERR_NO_SOURCE;
    fi

    $CONVERT_CMD $SOURCE -resize ${SIZE}x${SIZE}! -alpha On $PWD/$IMAGE_NAME-${SIZE}.png
}

# Converts the source image to 256 square, ignoring aspect ratio
generate_png 256 $SRC_IMAGE

if [ ! -f $PWD/favicon-256.png ] && [ ! -f $PWD/favicon-256-0.png ];
then
    echo "No File Created.";
    exit $ERR_NOT_IMAGE;
fi

# GENERATE THE VARIOUS SIZE VERSIONS
generate_png 16
generate_png 32
generate_png 48
generate_png 57
generate_png 64
generate_png 72
generate_png 114
generate_png 120
generate_png 144
generate_png 152

# GENERATE THE FAVICON.ICO FILE
$CONVERT_CMD $PWD/$IMAGE_NAME-16.png $PWD/$IMAGE_NAME-32.png $PWD/$IMAGE_NAME-48.png $PWD/$IMAGE_NAME-64.png -colors 256 -background $TRANSPARENT_COLOUR $PWD/$IMAGE_NAME.ico

# ZIP IT
zip -9 -D -m -j $PWD/favicon.zip $PWD/favicon*.png $PWD/favicon*.ico
zip -9 -D -j $PWD/favicon.zip $PWD/../../../views/favicon.html $PWD/../../../views/favicon.pug
