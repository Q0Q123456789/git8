let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let app = express(); /*实例化使用*/

let ObjectId = require('mongodb').ObjectID;

let bodyParser = require('body-parser');
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//查询图片
app.images = function (req, res) {
    DB.find("images", {}, function (err, data) {
        if (err) {
            config.obj = {
                responseCode: "10008",
                responseMsg: err,
                data: null
            }
        } else {
            config.obj = {
                responseCode: "10001",
                responseMsg: "请求成功！",
                data
            }
        }
        res.json(config.obj);
    })
};

//查询
app.query = function (req,res) {
    // let uploadTime = req.body.uploadTime;
    let name = req.body.name;
    let icon_url = req.body.icon_url;
    DB.find('menu',{'icon_url':{$regex:icon_url},'name':{$regex:name}},function (err,data) {
        if(err){
            config.obj = {
                responseCode: "10008",
                responseMsg: "添加失败！"
            }
        }else {
            config.obj = {
                responseCode: "10001",
                responseMsg: "添加成功！",
                data
            }
        }
        res.json(config.obj);
    })
};


module.exports = app;
console.log('查询-----加载成功');