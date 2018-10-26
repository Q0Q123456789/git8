let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let app = express(); /*实例化使用*/

let ObjectId = require('mongodb').ObjectID;
let multiparty = require('multiparty');
let fs = require("fs");

let bodyParser = require('body-parser');
// 给app配置bodyParser中间件
// 通过如下配置再路由种处理request时，可以直接获得post请求的body部分
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/upload",express.static("upload"));

//上传图片
app.upload= function (req, res) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload'; /*上传的目录*/
    form.parse(req, function (err, fields, files) {
        let param = {
            name:files.file[0].originalFilename,
            path:'/' + files.file[0].path,
            headers:files.file[0].headers,
            size:files.file[0].size,
            uploadTime:new Date().toLocaleString()
        };
        DB.find('images',{name:param.name},function (er,es) {
            if(es.length>0){
                config.obj = {
                    responseCode: "10002",
                    responseMsg: '已存在！',
                    es
                };
                res.json(config.obj);
            }else {
                DB.insertOne('images',param,function (err,data) {
                    DB.find('images',{name:param.name},function (er,es) {
                        if(err){
                            config.obj = {
                                responseCode: "10008",
                                responseMsg: err,
                                data: null
                            }
                        }else {
                            config.obj = {
                                responseCode: "10001",
                                responseMsg: "上传成功！",
                                data,
                                es
                            }
                        }
                        res.json(config.obj);
                    })
                })
            }
        })
    })
};
//下载文件
app.download = function (req,res) {
    console.log(req.query);
    let filename = req.query.filename +'.log';
    let file = './logs/' + filename;
    res.download(file,filename);
};
//删除文件
app.del = function (req , res) {
    let filename = req.query.filename + '.log';
    let file = './logs/' + filename;
    fs.unlink(file,(err) =>{
        if(err) throw err;
        res.send('删除成功！');
    });
};
app.uploadFile = function(req,res) {
    let form = new multiparty.Form();
    form.uploadDir = 'audio'; /*上传的目录*/
    form.parse(req,function (err, fields, files) {
        console.log(err);
        console.log(fields);
        console.log(files);
        res.send('···')
    })
};
module.exports = app;
console.log('附件-----加载成功！');