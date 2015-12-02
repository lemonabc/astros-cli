var router = require('express').Router();
// 服务-商家—易淘集团
router.get('/joinus5', function(req, res) {
    res.render('zhaopin-detail05', {
        pageName:'zhaopin-detail05',
        title:'职能类职务'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router