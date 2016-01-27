var nodeFS = require('fs');
var nodePath = require('path');

module.exports = {
    // env: 'development',
    // 项目名称
    name: 'astro',
    // web服务端口
    port: 3100,
    // 站点根目录
    root: require('path').join(__dirname, '..'),
    // 页面存储路径
    // page: require('path').join(__dirname, '..', 'pages'),
    // 接口代理
    /*proxy: {
        '/aj': {
            hostname: 'www.baidu.com',
            port: 80,
            url: '/',
            headers: {}
        }
    },*/
    // 是否自动启用静态资源服务器
    autoAssets: false,
    // 模板全局属性
    globalVariables: {
        // cdn: 'http://127.0.0.1:3201',
        // 静态资源版本号
        ver: function() {
            return Date.now;
        }
    }
};