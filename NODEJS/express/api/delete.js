let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let ObjectId = require('mongodb').ObjectID;

let app = express.Router(); /*实例化使用*/
let fs = require("fs");

app.delete = function(req ,res){
    let item = req.body;
    DB.deleteMany("warehousing",{_id:ObjectId(item.id)},function (err,data) {
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

module.exports = app;
console.log('删除-----加载成功');