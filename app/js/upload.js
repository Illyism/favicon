"use strict";

$(function () {
    /*global ProgressButton:false */
    var pBTN = new ProgressButton(document.getElementById("uploadbtn"));

    var fileButton = function () {
        $("#uploadbtn").trigger("click");
    };

    $('#fileupload').fileupload({
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        dataType: 'json',
        send: function () {
            fileButton();
        },
        fail: function (e, data) {
            $(".error").text("Server Error");
        },
        done: function (e, data) {
            var result = data.result;
            if (result.error) {
                $(".error").text(result.error);
            } else {
                var zip = result.zip;
                location.href = zip;
                $(".error").text("");
            }
            pBTN._stop(1);
        },
        progress: function (e, data) {
            console.log(data.loaded / data.total);
            pBTN._setProgress(data.loaded / data.total);
        }
    });
});