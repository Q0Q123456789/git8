let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');

const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'logs/cheese.log' }},
    categories: { default: { appenders: ['cheese'], level:'error'}}
});

let LogFile = log4js.getLogger('cheese');
let ObjectId = require('mongodb').ObjectID;

let app = express.Router(); /*实例化使用*/
let fs = require("fs");

app.warehousing = function (req, res) {
    let item = req.body;
    for(let i = 0 ;i<item.length;i++){
        let params = {
            name:item[i].name,
            model:item[i].model,
            colorNumber:item[i].colorNumber,
            number:item[i].number,
            flieName:item[i].flieName,
            flieUrl:item[i].flieUrl,
            addTime:new Date().toLocaleString(),
            purchaseTime:item[i].purchaseTime,
            loginTime:'',
            Specifications:item[i].Specifications,
            type:item[i].type
        };
        DB.insertOne("warehousing", params, function (err, data) {
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
            if(item.length == (i+1)){
                res.json(config.obj);
            }
        })
    }
};
module.exports = app;
console.log('仓库-----加载成功');

