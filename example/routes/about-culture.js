var router = require('express').Router();
// 文化和价值观—易淘集团
router.get('/about-culture', function(req, res) {
    res.render('about-culture', {
        pageName:'about-culture',
        title:'文化和价值观'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router