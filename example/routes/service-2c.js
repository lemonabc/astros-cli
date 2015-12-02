var router = require('express').Router();
// 服务-商家—易淘集团
router.get('/service-2c', function(req, res) {
    res.render('service-2c', {
        pageName:'service-sj',
        title:'我们的服务'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router