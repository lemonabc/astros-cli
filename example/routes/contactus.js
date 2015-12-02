var router = require('express').Router(); // 新建一个 router
router.get('/contactus', /*A, B, C,*/ function(req, res) {
    res.render('contact-us', {
        pageName:'contact-us',
        title:'联系我们'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router