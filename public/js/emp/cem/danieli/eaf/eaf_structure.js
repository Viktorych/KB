function onLoad(svg, error) {
    $('g#eaf').click(function () {
    });
    $('g#hydraulics').click(function () {
        window.location = "/emp/cem/danieli/eaf/hydraulics";
    });
}

$(function () {
    $('#main_eaf').svg({});
    var svg = $('#main_eaf').svg('get');
    svg.load('/emp/cem/danieli/eaf/main.svg', {
        addTo: false,
        changeSize: false,
        onLoad: onLoad
    });
});
