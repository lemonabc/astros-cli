var router = require('express').Router();
// 服务-商家—易淘集团
router.get('/joinus3', function(req, res) {
    res.render('zhaopin-detail03', {
        pageName:'zhaopin-detail03',
        designTxt:'及作品集',
        title:'设计类职位'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router