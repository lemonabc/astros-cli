#!/usr/bin/env node

var nodeFs = require('fs');
var stat = nodeFs.stat;
var fse = require('fs-extra');
var nodePath = require('path');
var spawn = require('child_process').spawn;
var program = require('commander');
var readline = require('readline');
// var release = require('../lib/release');
var copyDir = require('copy-dir');
if (!process.argv.slice(2).length) {
    console.error('你没有输入任何命令，是否想输入`astro init`?\n你可以通过 astro -h 获得更信息');
    process.exit(1);
}

program
    .command('create [dir]')
    .option('-n, --name [value]', '项目名称')
    .description('创建项目')
    .allowUnknownOption()
    .action(function(dir,options) {
        var name = options.name || 'Astro';
        var path = dir || '.';
        //判断是否存在输入的路径
        if (nodeFs.existsSync(path)) {
            path = nodePath.join(path,name);
            if (nodeFs.existsSync(path)){
                console.error('目录已存在，请更换其他目录或删除此目录');
            }else{
                nodeFs.mkdirSync(path);
                var rootPath = nodePath.join(__dirname, '..', 'example');
                //同步复制
                copyDir.sync(rootPath,path);
                console.error('完成');
            }
           
        }else{
            console.error('路径不存在');
        }
        
    });

program
    .command('init')
    .description('初始化项目')
    .option('-s, --start [value]', '是否提示开启服务', function(val) {
        return val != 'no' && val != 'false';
    }, true)
    .action(function(cmd) {

    });

program
    .command('release [dir]')
    .description('发布目录')
    .action(function(sitePath, options) {
        var release;
        try{
            release = require('./sh/release');
        }catch(e){
            try{
                release = require('./node_modules/astros/lib/release');
            }catch(e){
                console.error('没有发现astro项目');
                return;
            }
        }
        if (arguments.length < 2 || (typeof sitePath) != 'string') {
            console.error('你可以通过astro release sitePath 发布项目。或者通过help命令获取更多信息');
            return;
        }
        var stat = tryStat(sitePath);
        if (!stat) {
            console.error('站点 ' + sitePath + ' 不存在');
        }
        var cfgFile = require(nodePath.join(sitePath, 'config', 'static.js'));

        cfgFile.root = sitePath;
        cfgFile.name = cfgFile.name || 'default';

        release(cfgFile);
    });

program.parse(process.argv);


/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm(msg, callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(msg, function (input) {
    rl.close();
    callback(/^y|yes|ok|true$/i.test(input));
  });
}

function run(command, opt, cb) {
    var parts = command.split(/\s+/);
    var cmd = parts[0];
    var args = parts.slice(1);
    var proc = spawn(cmd, args, {
        stdio: 'inherit'
    });
    proc.on('close', function(code) {
        if (code !== 0) {
            cb(new Error('Command exited with a non-zero status'));
        } else {
            cb(null);
        }
    });
}

function tryStat(path) {
    try {
        return nodeFs.statSync(path);
    } catch (e) {
        return undefined;
    }
}