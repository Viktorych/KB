$(document).ready(function () {
var text=""
    function onLoad(svg, error) {
        /*
        $('g#eaf').click(function () {
        });
        $('g#hydraulics').click(function () {
            window.location = "/emp/cem/danieli/eaf/hydraulics";
        });
        */
        text = $('#tspan5457');

        readApi();
        var timerId = setInterval(readApi, 1000);
    }

    $(function () {

        $('#hydraulics').svg({});
        var svg = $('#hydraulics').svg('get');
        svg.load('/emp/cem/danieli/eaf/hydraulics/main.svg', {
            addTo: false,
            changeSize: false,
            onLoad: onLoad
        });


    });

    var readApi = function () {
        $.ajax({
            url: "/api", success: function (result) {
                console.log(result);
                text.text(result.OIL_PERSURE);
            }, error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(msg);
            }
        });
    };
});
