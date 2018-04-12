var express = require('express');
var router = express.Router();

/* Главная */
router.get('/', function(req, res, next) {
    res.render('main/main');
});
/* О программе */
router.get('/about',  function(req, res) {
    res.render('main/about');

});
/* Карта */
router.get('/map',  function(req, res) {
    res.render('main/map');
});
router.get('/orgchart',  function(req, res) {
    res.render('main/orgchart');
});
/* ЕМП */
router.get('/emp',  function(req, res) {
    res.render('emp/main');

});
/* ЦЭМ */
router.get('/emp/cem',  function(req, res) {
    res.render('emp/cem/main');

});
/* DANIELI */
router.get('/emp/cem/danieli',  function(req, res) {
    res.render('emp/cem/danieli/main');

});
router.get('/emp/cem/danieli/eaf',  function(req, res) {
    res.render('emp/cem/danieli/eaf/main');

});
router.get('/emp/cem/danieli/eaf/hydraulics',  function(req, res) {
    res.render('emp/cem/danieli/eaf/hydraulics/main');

});
module.exports = router;
