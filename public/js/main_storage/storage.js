
    var panZoomTiger = svgPanZoom('#map', {
        viewportSelector: '.svg-pan-zoom_viewport'
        , panEnabled: true
        , controlIconsEnabled: true
        , zoomEnabled: true
        , dblClickZoomEnabled: false
        , mouseWheelZoomEnabled: true
        , preventMouseEventsDefault: true
        , zoomScaleSensitivity: 0.2
        , minZoom: 1
        , maxZoom: 10
        , fit: true
        , contain: false
        , center: true
        , refreshRate: 'auto'

    });

    $('#jstree').jstree({
        'core': {
            'data': getStructureData()
        }
    });

