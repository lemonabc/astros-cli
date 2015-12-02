var router = require('express').Router();
// 公司荣誉
router.get('/news', function(req, res) {
    res.render('news', {
        pageName:'news',
        title:'易淘动态'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router