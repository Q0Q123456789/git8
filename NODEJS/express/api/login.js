let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let common = require('../model/common.js');
let ObjectId = require('mongodb').ObjectID;
let fs = require("fs");

const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' }},
    categories: { default: { appenders: ['cheese'], level:'error'}}
});

let LogFile = log4js.getLogger('cheese');
// LogFile.trace('This is a Log4js-Test');
// LogFile.debug('We Write Logs with log4js');
// LogFile.info('You can find logs-files in the log-dir');
// LogFile.warn('log-dir is a configuration-item in the log4js.json');
// LogFile.error('In This Test log-dir is : \'./logs/log_test/\'');

let app = express.Router(); /*实例化使用*/
let token,UserName;

//用户登录
app.login = function (req,res) {
    LogFile.error(req.body);
    UserName = req.body.username;
    const secret = req.body.password;
    const password = common.sha256(secret);
    DB.updateOne('login',{username: req.body.username},{ $set:{loginTime: new Date().toLocaleString() } } ,function (err , tiem){
        DB.find("login", {username: req.body.username}, function (errs, data) {
            LogFile.error(errs);
            LogFile.error(data);
            if (err) {
                config.obj = {
                    responseCode: "10008",
                    responseMsg: err
                }
            } else {
                if (data.length === 0) {
                    config.obj = {
                        responseCode: "10008",
                        responseMsg: "无效用户名！"
                    }
                } else if (data[0].password !== password ) {
                    config.obj = {
                        responseCode: "10008",
                        responseMsg: "密码错误！"
                    }
                } else {
                    const Token = common.sha256(JSON.stringify(data));
                    config.obj = {
                        responseCode: "10001",
                        responseMsg: "登录成功！",
                        data:{
                            token: Token
                        }
                    };
                    token = Token;
                }
            }
            res.json(config.obj);
        })
    })
};
//添加用户
app.addName = function (req,res) {
    const secret = req.body.password;
    const password = common.sha256(secret);
    DB.find('login',{username: req.body.username}, function(err,data) {
        if(err){
            config.obj = {
                responseCode: "10008",
                responseMsg: err
            }
        } else if( data[0].username === req.body.username ){
            config.obj = {
                responseCode: "10008",
                responseMsg: "账号已存在！"
            }
        } else if ( data[0].username !== req.body.username ) {
            let params = {
                username: req.body.username,
                password: password,
                addTime: new Date().toLocaleString(),
                loginTime: '',
                falseOne: true,
                weight: '1',
                sex: req.body.sex
            };
            DB.insertOne('login',params,function ( err,data ) {
                if (err) {
                    config.obj = {
                        responseCode: "10008",
                        responseMsg: "添加失败！"
                    }
                } else {
                    config.obj = {
                        responseCode: "10001",
                        responseMsg: "添加成功！",
                        data
                    }
                }
            })
        }
        res.json(config.obj);
    })
};
//获取用户信息
app.findUser = function (req,res) {
    if (req.query.token === token){
        DB.find('login',{username: UserName},function (err,data) {
            config.obj = {
                responseCode: "10001",
                responseMsg: "登录成功！",
                data
            };
            res.json(config.obj);
        })
    }
};
module.exports = app;
console.log('登录-----加载成功！');