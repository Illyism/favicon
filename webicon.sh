#!/usr/bin/env bash

######################################
# INITIALIZE VARS

CONVERT_CMD=`which convert`
SRC_IMAGE=$1
PWD=$2
TRANSPARENT_COLOUR="#FFFFFF"
IMAGE_NAME="favicon"

######################################
# REQUIREMENTS

if [ -z $CONVERT_CMD ] || [ ! -f $CONVERT_CMD ] || [ ! -x $CONVERT_CMD ];
then
    echo "ImageMagick needs to be installed to run this script"
    exit;
fi

if [ -z $SRC_IMAGE ];
then
    echo "You must supply a source image as the argument to this command."
    exit;
fi

if [ ! -f $SRC_IMAGE ];
then
    echo "Source image \"$SRC_IMAGE\" does not exist."
    exit;
fi


generate_png() {
    local SIZE=$1
    local SOURCE=$2

    if [ -z "$SOURCE" ]; then
        SOURCE="$PWD/$IMAGE_NAME-256.png"
    fi

    if [ -z $SOURCE ];
    then
        echo "Could not find the source image $SOURCE"
        exit 1;
    fi

    $CONVERT_CMD $SOURCE -resize ${SIZE}x${SIZE}! -alpha On $PWD/$IMAGE_NAME-${SIZE}.png
}

# Converts the source image to 256 square, ignoring aspect ratio
generate_png 256 $SRC_IMAGE

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
zip -9 -D -j $PWD/favicon.zip $PWD/../../../views/favicon.html $PWD/../../../views/favicon.jade