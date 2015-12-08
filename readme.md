# astros-cli

astros命令行工具，可通过命令完成创建项目和发布项目


创建项目

在 `~/project/`下创建项目`demo`

```
$ astros create [dir]
```

demo1，相对路径:

```
$ cd ~/project
$ astros create demo
```


demo2，绝对路径:

```
$ astros create ~/project/demo
```

demo3，在当前目录创建:

```
$ mkdir ~/project/demo
$ cd ~/project/demo
$ astros create
```