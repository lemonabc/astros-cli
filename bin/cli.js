#!/usr/bin/env node

require('console-prettify')({
    prefix:1
});

var nodeFs = require('fs');
var stat = nodeFs.stat;
var fse = require('fs-extra');
var nodePath = require('path');
var spawn = require('child_process').spawn;
var program = require('commander');
var readline = require('readline');

require('console-prettify')();

var copyDir = require('copy-dir');
if (!process.argv.slice(2).length) {
    console.warn('你没有输入任何命令，是否想输入`astros create`?\n 你可以通过 astro -h 获得更信息');
    process.exit(1);
}

program
    .version(require('../package.json').version)
    .command('create [dir]')
    .description('创建项目')
    .allowUnknownOption()
    .action(function(dir, options) {
        //path.isAbsolute
        var path;
        if (!dir) {
            path = nodePath.join(process.cwd(), 'astro-project');
        } else if (nodePath.isAbsolute(dir)) {
            path = dir;
        } else {
            path = nodePath.join(process.cwd(), dir);
        }

        if (nodeFs.existsSync(path)) {
            console.error('目录 %s 已存在，请更换其他目录或清空此目录', path);
        } else {
            nodeFs.mkdirSync(path);
            var rootPath = nodePath.join(__dirname, '..', 'example');
            //同步复制
            console.info('初始化...');
            copyDir.sync(rootPath, path);
            console.info('安装依赖...');
            process.chdir(path);
            run((process.platform === "win32" ? "npm.cmd" : "npm")+' install', null, function(){
                console.info('初始化完成 ^_^ ');
                console.info('项目目录是 %s', path);
                confirm('是否立即运行服务？(Y/n)', function(y){
                    if(y){
                        run('node server');
                    }
                })
            });

        }
    });

program
    .command('build [dir]')
    .description('发布目录')
    .action(function(sitePath, options) {
        var sitePath = sitePath || nodePath.join(process.cwd());
        var stat = tryStat(sitePath);
        if (!stat) {
            console.error('站点 %s 不存在', sitePath);
            return;
        }        
        try{
            var b = nodePath.join(sitePath, 'sh', 'build.js');
            stat = tryStat(b);
            if(stat && stat.isFile()){
                run('node ' + b, null, function(){
                    console.log('发布成功');
                });
                return;
            }
        }catch(e){}

        var release;
        release = require(nodePath.join(sitePath, 'node_modules', 'astros')).builder;

        // 判断是否存在 static.js
        var cfgFile;
        try{
            cfgFile = require(nodePath.join(sitePath, 'config', 'static-build.js'));
        }catch(error){
            // 兼容老项目
            cfgFile = require(nodePath.join(sitePath, 'config', 'static.js'));
            cfgFile.middlewares = cfgFile.rel.middlewares || [];
        }

        cfgFile.root = sitePath;
        cfgFile.name = cfgFile.name || 'default';
        var b = new release(cfgFile);
        b.build(function(){
            console.log('发布成功');
        })
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

    rl.question(msg, function(input) {
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