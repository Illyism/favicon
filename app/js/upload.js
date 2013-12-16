
$(function () {
	var pInst;
	new ProgressButton(document.getElementById("uploadbtn"), {
		callback : function( instance ) {
			pInst = instance;
		}
	} );
	$("#fileupload").click(function() {
		$("#uploadbtn").click();
	})
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	var result = data.result;
            var zip = result.zip;
            location.href = zip;
            pInst._stop(1);
        },
        progress: function (e, data) {
            $("#uploadbtn").click();
            pInst._setProgress( parseInt(data.loaded / data.total) );
        }
    });
});