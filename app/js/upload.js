
$(function () {
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
        	var result = data.result;
            var zip = result.zip;
            location.href = zip;
            $(".progress").addClass("successful");
            $('.progress .bar').css(
                'width',
                "0%"
            );
        },
        progress: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(".progress").removeClass("successful");
            $('.progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });
});