let express = require("express");
let DB = require('../model/db.js');
let config = require('../model/config.js');
let common = require('../model/common.js');
let app = express(); /*实例化使用*/

let ObjectId = require('mongodb').ObjectID;
let multiparty = require('multiparty');
let fs = require("fs");

const logger = require('log4js').getLogger("upload");

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
    let filename = req.query.name;
    let file = '.' + req.query.file;
    res.download(file,encodeURI(filename));
};
//删除文件
app.del = function (req , res) {
    let file = '.'+req.body.file;
    fs.unlink(file,(err) =>{
        if(err) throw err;
        config.obj = {
            responseCode: "10001",
            responseMsg: "请求成功！"
        };
        res.json(config.obj)
    });
};
app.uploadFile = function(req,res) {
    let form = new multiparty.Form();
    form.uploadDir = 'upload'; /*上传的目录*/
    form.parse(req,function (err, fields, files) {
        let file = files.file[0];
        let uploadName = common.folder(file.originalFilename);
        let filePath = file.path;
        let dstPath = 'upload'+ uploadName + file.originalFilename;
        fs.rename(filePath,dstPath,function(err){
           if(err){
               console.log(err);
               logger.info(err);
           } else {
               let fileUrl = '/' + dstPath;
               config.obj = {
                   responseCode: "10001",
                   responseMsg: "请求成功！",
                   fileUrl:fileUrl
               };
               logger.error(config.obj);
               res.json(config.obj)
           }
        });
    })
};
module.exports = app;
console.log('附件-----加载成功！');