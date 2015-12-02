var router = require('express').Router();
// 大记事
router.get('/about-history', function(req, res) {
    res.render('about-history', {
        pageName:'about-history',
        title:'大记事'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router