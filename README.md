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
    
**mongodb操作**

1. 数据库操作

	1. 新增数据库
	```
	use 数据库名; //如果数据库名不存在则新建，如果存在则切换到该数据库。
	```	
	2. 查看数据库
	```
	show dbs; //查看当前服务器所有的数据库，如果数据库没有任何内容则不会显示出来
	show databases; //同上
	db; //查看当前正在使用的数据库
	```
	3. 删除数据库
	```
    db.dropDatabase(); //删除当前正在使用的数据库
    ```
	
2. 集合操作

    1. 新增集合
    ```
    db.集合名.insert({数据});
    db.users.insert({"name":"张三","password":"123456"});
    ```
		
    2. 查看集合

    ```
    show collections; 【掌握】//查看当前数据库中有哪些集合
    ```
		
    3. 删除集合
    ```
    db.集合.drop(); //删除指定的集合
    ```
	
3. 文档操作
 
	1） 新增文档
    ```
	db.集合名.insert({JSON数据}); 【掌握】//【推荐使用insert】
	db.users.save({"name":"李四","password":"llllisi"});
	```
		
	.insert和 .save的区别：
	
	如果新增的数据中没有_id属性 两个命令的用法和效果完全一样。
	
	如果新增的数据中有 _id属性，如果不冲突效果也是一样都是新增。
	
	如果冲突：
	.insert 会报错
	.save 会修改
	
	2） 查看文档
	```
	db.users.find(); 【掌握】//查看集合中的所有文档
	db.users.find({}); //按条件查询
	db.users.find().pretty(); //将查询结果格式化后再显示
	```
	3） 删除文档
	```
	db.users.remove({"name":"李四"}); //删除符合条件的数据（文档）
	db.users.remove({}); //删除所有数据
	```	
	注意： 在执行删除或修改命令时，一定谨慎！谨慎！再谨慎！
	
	4） 修改文档
	
    	db.users.update({按条件查询要修改的数据},{将数据修改成什么样}); //根据条件查询数据再修改
    	db.users.update({按条件查询要修改的数据},{$set:{将数据修改成什么样}}); //改一部分
    	db.users.save({"_id":id值,'name':"值"}); //将指定ID的数据修改成后面内容

        1. 按条件查询
	    db.集合名.find(); //查看当前集合的所有数据
	    db.集合名.find({条件}); //按条件查询

    	    1） 按指定的值查询数据【重点】
    		db.集合名.find({"属性名":"值"});
    		db.集合名.find({"属性名":正则表达式}); //模糊查询
    		
    		示例：
    		db.list.find({"sex":"女"});
    		
        	2） 查询小于或大于指定值的数据 $lt
        		db.list.find({"属性名":{$lt:"值"}}); //小于
        		db.list.find({"属性名":{$gt:"值"}}); //大于
        		
        		示例：
        		db.list.find({"age":{$lt:30}}); //查询年龄小于30岁的所有数据
        		
        	3） 查询小于等于指定值的数据 $lte
        		db.list.find({"属性名":{$lte:"值"}}); //小于等于
        		db.list.find({"属性名":{$gte:"值"}}); //大于等于
        		
        		db.list.find({"age":{$lte:32}});
        		//SQL: select * from list where age <= 32
        
        	4）区间查询
        		db.list.find({"属性名":{$gt:"值",$lt:"值"}})
        	
        		db.list.find({"age":{$gt:30 , $lt:40}}); //查询年龄在 30 -- 40 之间的所有数据
        		//SQL： select * from list where age>30 and age<40
        		
        	5） 不等于 $ne
        		db.list.find({"country":{$ne:"中国"}});
        		//SQL： select * from list where country <> '中国'
        		
        	6）$in子句【重点】
        		db.list.find({"属性名":{$in:['值1','值2','值n']}}); //按指定的数组进行匹配，只匹配到数组中指定的数据
        		
        		示例：
        		db.list.find({"name":{$in:['刘德华','刘欢','周杰伦','刘备']}}); //查询刘德化、刘欢、周杰伦、刘备
        		//SQL: select * from list where name in ('刘德华','刘欢','周杰伦','刘备')
        
        	7） $nin子句
        		db.list.find({"属性名":{$nin:['值1','值2','值n']}}); //查询所有没有集合中出现的数据
        		
        	8） $size匹配
        		db.list.find({"works":{$size:3}}); //匹配works的值长度是3的数据，works的值必须是数组
        		
        	9） $or 或者子句【重点】
        		db.list.find({$or:[{"属性名":"值"},{"属性名":"值"}]}); //不同属性名任意一个匹配上都查询出来
        		
        		//[同一个属性，不同的值] 查看年龄是32 或者 年龄是55 的数据
        		db.list.find({$or:[{"age":32},{"age":55}]});
        		//SQL: select * from list where age=32 or age=55
        		
        		//[不同属性，不同值] 查看年龄是32 或者 性别是男的
        		db.list.find({$or:[{"age":32},{"sex":"男"}]});
        
        2. 排序sort【重点】
        	db.集合名.find().sort({"属性名":排序编号});
        		排序编号：
        			1	升序：从小到大
        			-1	降序：从大到小
        	
        	db.list.find().sort({"age":1}); //按年龄进行从小到大排序
        	db.list.find().sort({"age":1,"score":-1}); //两个属性排序，如果第一个属性无法判断先后，可以使用第二个属性
        	
        	//SQL: select * from list order by age asc,score desc;
        	
        3. 其它【重点】
        	1） .skip	跳过指定的数据
        		.skip(n)
        		
        		db.list.find().skip(10); //跳过10条数据，从第11条数据开始输出
        		
        	2） .limit限定输出条数
        		.limit(n)
        		
        		db.list.find().skip(10).limit(1); //跳过10条数据，从第11条数据开始输出1条
	        注意： 使用这些子句可以实现分页功能
    
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

##### 附增删改查:

增: post ------- http://120.79.239.41:3000/users/addUser  {username: 'xxx', password: 'xxx'}

删: get ------- http://120.79.239.41:3000/users/delUser?id=5cb5836967dbe621cc74c03f

改: post -------  http://120.79.239.41:3000/users/editUser {username: 'xxx', password: 'xxx', _id: 'xxx'}

查: get ------ http://120.79.239.41:3000/users/userList
