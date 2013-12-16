
$(function () {
    var pBTN = new ProgressButton(document.getElementById("uploadbtn"));

    var fileButton = function() {
        $("#uploadbtn").trigger("click");
    }

    $('#fileupload').fileupload({
        dataType: 'json',
        send: function() {
            fileButton()
        },
        done: function (e, data) {
        	var result = data.result;
            var zip = result.zip;
            location.href = zip;
            pBTN._stop(1);
        },
        progress: function (e, data) {
            console.log(data.loaded / data.total);
            pBTN._setProgress( data.loaded / data.total );
        }
    });
});