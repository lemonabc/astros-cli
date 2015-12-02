var router = require('express').Router();
// 公司荣誉
router.get('/about-honor', function(req, res) {
    res.render('about-honor', {
        pageName:'about-honor',
        title:'公司荣誉'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router