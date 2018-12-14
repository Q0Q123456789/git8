let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let common = require('../model/common.js');
let ObjectId = require('mongodb').ObjectID;
let fs = require("fs");

const logger = require('log4js').getLogger("login");

let app = express.Router(); /*实例化使用*/
let token,UserName;

//用户登录
app.login = function (req,res) {
    UserName = req.body.username;
    const secret = req.body.password;
    console.log(req.body);
    const password = common.sha256(secret);
    DB.updateOne('login',{username: req.body.username},{ $set:{loginTime: new Date().toLocaleString() } } ,function (err , tiem){
        DB.find("login", {username: req.body.username}, function (errs, data) {
            if (err) {
                config.obj = {
                    responseCode: "10008",
                    responseMsg: err
                };
                logger.info(config.obj);
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
            logger.error(data);
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
console.log('登录-----加载成功');