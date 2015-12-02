var router = require('express').Router();
// 关于我们-业务范畴
router.get('/about-business', function(req, res) {
    res.render('about-business', {
        pageName:'about-business',
        title:'业务范畴'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router