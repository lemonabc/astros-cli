var router = require('express').Router();
// 服务
router.get('/service', function(req, res) {
    res.render('service', {
        pageName:'service',
        title:'我们的服务'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router