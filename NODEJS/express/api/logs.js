let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let common = require('../model/common.js');
let ObjectId = require('mongodb').ObjectID;
let fs = require("fs");

const logger = require('log4js').getLogger("login");

let app = express.Router(); /*实例化使用*/

app.logs = function (req, res) {
    let Catalog = './logs/error';
    fs.readdir(Catalog, function(err, files) {
        if (err) {
            throw err;
        }
        // files是一个数组
        // 每个元素是此目录下的文件或文件夹的名称
        // console.log(files);
        var data = fs.readFileSync('./logs/error/error.log');
        // res.json(data.toString());
        res.send(data.toString());
    });
};

module.exports = app;
console.log('日志-----加载成功');