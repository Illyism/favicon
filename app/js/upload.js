
$(function () {
    var pBTN = new ProgressButton(document.getElementById("uploadbtn"));

    $('#fileupload').fileupload({
        dataType: 'json',
        submit: function() {
            $("#uploadbtn").trigger("click");
        },
        done: function (e, data) {
        	var result = data.result;
            var zip = result.zip;
            location.href = zip;
            pBTN._stop(1);
        },
        progress: function (e, data) {
            pBTN._setProgress( data.loaded / data.total );
        }
    });
});