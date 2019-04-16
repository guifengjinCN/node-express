## pm2+node+express 服务器部署

#### 本地预览-自己电脑(需要node+mongodb)

**安装node**

`https://nodejs.org/zh-cn/download/releases/` ,自己找个版本下载,建议`8.0+`,安装基本下一步

**安装express**

`npm i express-generator -g`, 安装`express`官方提供的生成器,使用:

```
express server // 创建名为server的目录

cd server // 进入server目录

npm i // 安装依赖

npm start // 查看是否成功
```

**安装mongodb并配置**

1. `https://www.mongodb.com/download-center#community`, 自己找个版本下载,建议`3.0+`,安装基本下一步

配置环境变量

2. 复制`mongodb`安装目录下的`bin`目录的路径（如：`C:\Program Files\MongoDB\Server\3.2\bin`）添加到计算机环境变量的`path`中

3. 创建文件夹用于存储数据文件和日志文件

    1、在d盘建立一个文件夹`mongodb`，并且建立子目录`db`和`log`.

    2、在log目录下建立一个文件`MongoDB.log` ，后缀为`.log`.

    `d:\mongodb\db`、`d:\mongodb\log`， 分别用来存放数据库文件和数据库日志文件.

    3、把mongodb文件夹的只读属性去掉。

4. 配置mongodb并将其设置为windows服务

    以管理员身份运行`cmd`，进入`bin`文件夹，执行下列命令（命令中的`d:\mongodb\db`和`d:\mongodb\log\MongoDB.log`应该正确指向自己在上一步创建的文件路径）
   ```
   mongod  --dbpath "d:\mongodb\db" --logpath "d:\mongodb\log\MongoDB.log" --install --serviceName "MongoDB"
   ```
    接着启动mongodb服务, `NET START MongoDB`
    
    测试链接, 在`cmd`中输入`mongo`回车
    
#### 目录结构说明
```
+-- bin/                                    ---项目入口文件,之前是app.js
+-- config/                                 ---自建配置文件,主要关于mongodb
+-- public/                                 ---公共文件
+-- models/                                 ---mongoose的骨架+模型
+-- node_modules/                           ---npm下载文件目录
+-- routes/                                 ---路由文件(请求api)
+-- views/                                  ---视图文件
--- app.js                                  ---express全局配置等
--- package.json                            ---包配置文件
--- processes.json                           ---linux pm2部署新建文件
```
    
> 其它说明看项目源码
    
#### linux安装部署参考

`linux`上`mongodb`安装最后我请我公司运维大佬帮忙安装的,后面再自己搞搞

[centos 上安装nodejs v8.0.0](https://www.cnblogs.com/baby123/p/6955396.html)

[liunx 安装NodeJS PM2](https://blog.csdn.net/u012765616/article/details/79204009)

[PM2来部署nodejs服务器永久开启](https://www.cnblogs.com/lxg0/p/7771229.html)

pm2-node项目部署:

本地首先在项目根目录添加一个`processes.json`,内容参考本项目,直接将本地写好的代码上传到服务器,之后在服务器输入`pm2 start processes.json`,好了?没错,就是这么简单,之前一直以为高大上...,实际验证: [获取角色列表(get)](http://120.79.239.41:3000/users/userList)