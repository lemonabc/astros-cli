var router = require('express').Router();
// 服务-商家—易淘集团
router.get('/joinus-1', function(req, res) {
    res.render('zhaopin-detail01', {
        pageName:'zhaopin-detail01',
        title:''
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router