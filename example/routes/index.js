var router = require('express').Router();
router.get('/', function(req, res) {
    res.render('index', {
        title:'首页'
    }, function(err, html){
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});
module.exports = router