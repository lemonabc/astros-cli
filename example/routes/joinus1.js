var router = require('express').Router();
router.get('/joinus1', function(req, res) {
    res.render('zhaopin-detail01', {
        pageName:'zhaopin-detail01',
        title:'技术类职务'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router