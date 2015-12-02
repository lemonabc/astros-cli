var nodePath = require('path');
var nodeUtil = require('util');
// var express = (require('express'));
var app = (require('express'))();

var pandora = new(require('pandorajs'));

var appCfg = require('./config/site.js');
app.set('env', appCfg.env);

process.env.NODE_ENV = appCfg.env;


pandora.init(app, __dirname);

require('pandora-proxy')(app);

app.listen(appCfg.port);

console.log(nodeUtil.format('server is listening on %d', appCfg.port));