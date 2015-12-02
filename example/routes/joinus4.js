var router = require('express').Router();
// 服务-商家—易淘集团
router.get('/joinus4', function(req, res) {
    res.render('zhaopin-detail04', {
        pageName:'zhaopin-detail04',
        title:'市场类职务'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router