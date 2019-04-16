var express = require('express');
var router = express.Router();
var userModel = require('../models/user')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('This is node server');
});

// 查询用户列表
router.get('/userList', (req, res, next) => {
  userModel.find({}, (err, data) => {
    if (err) {
      res.end(err);
      return next();
    }
    res.json(data);
  })
});

// 增
router.post('/addUser', (req, res, next) => {
  var { username, password } = req.body
  if(username && password) {
    userModel.find({username: username}, (err, data) => {
      if (err) {
        res.end(err);
        return next();
      }
      if(data.length) {
        res.json({status: -2000, msg: "用户名已存在"})
      }else {
        var user = new userModel({
          username: username,
          password: password,
          createTime: new Date().valueOf()
        })
        user.save(function (err) {
          if (err) {
            res.end(err);
            return next();
          }
          res.json({status: 1, msg: "新增成功"})
        });
      }
    })
  }else {
    res.json({status: -2001, msg: '用户名和密码不完整'})
  }
});

// 删
router.get('/delUser', (req, res, next) => {
  var userId = req.query.id;
  userModel.findById(userId, (err, data) => {
    if(err) {
      res.end(err);
      return next();
    }
    data.remove(err => {
      if(err) {
        res.end(err);
        return next();
      }
      res.json({satus: 1, msg: "删除成功!"})
    })
  })
});

// 改
router.post('/editUser', (req, res, next) => {
  let { username, password, _id } = req.body;
  userModel.findById(_id, (err, data) => {
    if(err) {
      res.end(err);
      return next()
    }
    data.username = username;
    data.password = password;
    data.save(err => {
      if(err) {
        res.end(err);
        return next();
      }
      res.send({status: 1, msg: '修改成功!'})
    })
  })
});

module.exports = router;
