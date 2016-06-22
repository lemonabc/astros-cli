#!/usr/bin/env node

require('console-prettify')({
    prefix: 1
});
const downloadUrl = 'https://github.com/lemonabc/astros-example/archive/cli-00X.tar.gz'
var fse = require('fs-extra');
var spawn = require('child_process').spawn;
var nodeFs = require('fs');
var stat   = nodeFs.stat;
var program = require('commander');
var readline = require('readline');
var nodePath = require('path');

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
            console.error('目录 %s 已存在，请更换其他目录或删除此目录', path);
        } else {
            nodeFs.mkdirSync(path);
            var dataFile = nodePath.join(path, '_package.tar.gz');
            nodeFs.writeFileSync(dataFile, ' ');

            var rootPath = nodePath.join(__dirname, '..', 'example');
            //同步复制
            console.info('初始化...');
            //git下载最新项目
            console.log('正在下载：%s', downloadUrl);

            var file = nodeFs.createWriteStream(dataFile);

            file.on('finish', function() {
                console.log('正在解压...');
                require('tar.gz')().extract(dataFile, path)
                    .then(function(err) {
                        if (err) {
                            throw err;
                        }
                        setTimeout(function() {
                            require('copy-dir').sync(nodePath.join(path, 'astros-example-cli-00X'),
                                path);
                            fse.remove(nodePath.join(path, 'astros-example-cli-00X'));
                            fse.remove(dataFile);
                            console.log('项目创建完成 ^_^');
                            console.info('站点目录为%s ', path);
                            console.info('正在安装依赖...');
                            process.chdir(path);
                            run((process.platform === "win32" ? "npm.cmd" : "npm") + ' install', null, function() {
                                console.info('初始化完成 ^_^ ');
                                console.info('项目目录: %s', path);
                                console.info('你可以加入QQ群 386366087 或者访问 http://www.iastros.com 获得帮助');
                                confirm('是否立即运行服务？(Y/n)', function(y) {
                                    if (y) {
                                        run('node server');
                                    }
                                })
                            });

                        }, 3000)
                    });
            });

            var rst = require('request')(downloadUrl)
            rst.pipe(file);
            // //


        }
    });

program
    .command('build [dir]')
    .option('-h, --html', '发布html页面')
    .description('发布项目')
    .action(function(sitePath, options) {

        var sitePath = sitePath || nodePath.join(process.cwd());
        var stat = tryStat(sitePath);
        if (!stat) {
            console.error('站点 %s 不存在', sitePath);
            return;
        }
        try {
            var b = nodePath.join(sitePath, 'sh', 'build.js');
            stat = tryStat(b);
            if (stat && stat.isFile()) {
                run('node ' + b, null, function() {
                    console.log('发布成功');
                });
                return;
            }
        } catch (e) {}

        var release;
        release = require(nodePath.join(sitePath, 'node_modules', 'astros')).builder;

        // 判断是否存在 static.js
        var cfgFile;
        if (nodeFs.existsSync(nodePath.join(sitePath, 'config', 'static-build.js'))) {
            cfgFile = require(nodePath.join(sitePath, 'config', 'static-build.js'));
        } else {
            // 兼容老项目
            cfgFile = require(nodePath.join(sitePath, 'config', 'static.js'));
            cfgFile.middlewares = cfgFile.rel ? cfgFile.rel.middlewares || [] : [];
        }

        cfgFile.root = sitePath;
        cfgFile.name = cfgFile.name || 'default';



        if (options.html) {
            release = require(nodePath.join(sitePath, 'node_modules', 'astros')).builderHTML;
        }

        var b = new release(cfgFile);
        b.build(function() {
            console.log('发布成功');
        });
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
        callback(input == '' || /^y|yes|ok|true$/i.test(input));
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