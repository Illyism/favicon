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