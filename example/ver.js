var express = require('express');
var app = express();
var appCfg = require('./config/site.js');
var nodePath = require('path');
var fs = require('fs');

app.set('env', appCfg.env);

process.env.NODE_ENV = appCfg.env;

app.get('/', function(req, res) {

    var ver_file = nodePath.join(__dirname, 'config','ver.txt'),
        time = new Date().getTime().toString();
    fs.writeFileSync(ver_file, time); //同步写 
    res.set('Content-Type', 'text/html');
    res.end(time);
});


app.listen(appCfg.ver_port || 3000);