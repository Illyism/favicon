
$(function () {
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	var result = data.result;
            var zip = result.zip;
            location.href = zip;
        }
    });
});