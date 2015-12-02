var nodeFS = require('fs');
var nodePath = require('path');
var ver_cache = {};
//  缓存文件路径
var ver_file = nodePath.join(__dirname, 'ver.txt');

module.exports = {
    // env: 'development',
    // 项目名称
    name: 'astro',
    // 服务器端口
    port: 3100,
    // 更新本版号端口
    ver_port: 3201,
    // 站点根目录
    root: require('path').join(__dirname, '..'),
    // 页面存储路径
    page: require('path').join(__dirname, '..', 'tpls'),
    proxy: {
        '/aj': {
            hostname: 'www.baidu.com',
            port: 80,
            url: '/',
            headers: {}
        }
    },
    // 静态资源版本号
    static_ver: function() {
        try {
            if (nodeFS.statSync(ver_file).mtime - ver_cache['mtime'] != 0) {
                ver_cache['mtime'] = nodeFS.statSync(ver_file).mtime;
                ver_cache['ctx'] = nodeFS.readFileSync(ver_file).toString().substr(0, 16);
            }
            return ver_cache['ctx'];
        } catch (err) {
            console.error('static_ver: ' + ver_file + 'is miss', err);
            return '';
        }
    },
    // 是否自动启用静态资源服务器
    autoAssets: false,
    // 模板全局属性
    globalVariables: {
        cdn: 'http://127.0.0.1:3104/etao_cn',
        assets: 'http://10.8.8.43:81/assets',
        theme:'blue',
    }
};