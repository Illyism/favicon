
$(function () {
    $('#fileupload').fileupload({
        dataType: 'json',
        add: function (e, data) {
        	$('.progress .bar').css(
                'width',
                "0%"
            );
           data.submit();
        },
        done: function (e, data) {
        	var result = data.result;
            var zip = result.zip;
            location.href = zip;
            $(".progress").addClass("success");
            $('.progress .bar').css(
                'width',
                "100%"
            );
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            console.log(progress+"%");
            $('.progress .bar').css(
                'width',
                progress + '%'
            );
        }
    });
});