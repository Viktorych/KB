var express = require('express');
var plc = require('../plc');
var orgchart = require('../app_api/orgchart');


var router = express.Router();


/* Главная */
router.get('/', function(req, res, next) {
    //console.log(plc.plc());
    res.send(plc.plc());
});

router.get('/t', function(req, res, next) {
    //console.log(plc.plc());
    //var ltt = new LTT(main_structure_data, {
    //    key_id: 'id',
    //    key_parent: 'parent'
    //});
    //var tree =  flatToNested.convert(getStructureData());

    console.log( orgchart );
    res.send(orgchart);
});



module.exports = router;