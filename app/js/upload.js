
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
            pBTN._setProgress( parseInt(data.loaded / data.total) );
        }
    });
});