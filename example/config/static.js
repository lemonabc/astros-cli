// 静态资源服务器配置
module.exports = {
    // 站点根目录
    root: require('path').join(__dirname, '..'),
    // 页面存储路径
    page: require('path').join(__dirname, '..', 'tpls'),
    // JS文件后缀名，默认为js
    // jsExt:'js',
    // CSS文件后缀名
    // cssExt:'less',
    // JS 相关配置
    cdnPrefix:'/etao_cn',
    //交错属性开关
    //interlace:true,
    //打开MD5图片
    //openMd5:true,
    // imgPath:'/etao_cn',
    js: {
        // 模块对应的外网引用地址
        source: {
            'jquery': 'http://cdn.baidu.com/jquery.js',
        },
        // 不合并的模块
        unCombine: ['jquery', 'mo', 'zepto']
    },
    // 引用的插件，根据书写顺序加载
    plugins: [
        'astro-plugin-imgpath',
        '@etao/astro-plugin-theme-var',
        '@etao/astro-plugin-theme-url',
        '@etao/astro-plugin-imgpath'
    ],
    // cdn:'',
    //发布的配置
    rel: {
        // 发布时需要忽略的目录
        ignore: ['jslib', 'less'],
        // 发布时需要加载的插件
        plugins: ['@etao/astro-plugin-theme-rel']
    }
}