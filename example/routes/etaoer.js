var router = require('express').Router(); // 新建一个 router

// var A = require('../middlewares/A');
// var B = require('../middlewares/B');
// var C = require('../middlewares/C');

// 在 router 上装备控制器与中间件
router.get('/etaoer', /*A, B, C,*/ function(req, res) {
    res.render('etaoer', {
        pageName:'etaoer',
        title:'易淘人'
    }, function(err, html){
        // console.log(html);
        res.set('Content-Type', 'text/html');
        res.end(html)
    });
});

module.exports = router