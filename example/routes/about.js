var router = require('express').Router(); // 新建一个 router
//关于我们
router.get('/aboutus', function(req, res) {
    res.render('about-company', {
        pageName:'about-company',
        title:'关于我们'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router