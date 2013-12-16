
$(function () {
    var pBTN = new ProgressButton(document.getElementById("uploadbtn"));

	$("#fileupload").click(function() {
		$("#uploadbtn").trigger("click");
	})
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	var result = data.result;
            var zip = result.zip;
            location.href = zip;
            pBTN._stop(1);
        },
        progress: function (e, data) {
            console.log(100 * (data.loaded / data.total) + '%');

            pBTN._setProgress( data.loaded / data.total );
        }
    });
});