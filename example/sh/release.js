#!/usr/bin/env node

var Release = require('@etao/astro-cli');

var sietCfg = require('../config/static.js');
sietCfg.evn = 'release';
var rel = new Release(sietCfg);

var themes = ['blue'];

console.info('开始发布多模板：');
for (var i = 0; i < themes.length; i++) {
    console.info('正在发布 %s', themes[i]);
    astro.theme = themes[i];
    rel.dealPage();
}