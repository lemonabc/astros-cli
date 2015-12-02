var router = require('express').Router();
// 服务-商家—易淘集团
router.get('/joinus2', function(req, res) {
    res.render('zhaopin-detail02', {
        pageName:'zhaopin-detail',
        title:'产品类职务'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router