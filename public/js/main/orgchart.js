$(function() {
    var nodeTemplate = function(data) {
        return `
        <span class="office">${data.office}</span>
        <div class="title">${data.name} ghf</div>
        <div class="content">${data.title}</div>
      `;
    };
    $(this).keypress(function(event) {
        if (event.keyCode == 13) {
            alert('hi.')
        }
    });
    $.ajax({
        url: "/api/t", success: function (result) {
            console.log(JSON.stringify(result));


            var oc = $('#chart-container').orgchart({
                'data' : result.orgchart,
                'nodeContent': 'title',
                'pan': true,
                'zoom': true,
                'verticalLevel': 4,
                'visibleLevel': 5,
                'nodeTemplate': nodeTemplate
            });

            oc.$chartContainer.on('touchmove', function(event) {
                event.preventDefault();
            });

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


});