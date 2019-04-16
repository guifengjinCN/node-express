var mongoose = require('mongoose');

// 定义骨架
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    createTime: Date,
    lastLogin: Date
});

// 通过骨架创建模型 model
var userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
