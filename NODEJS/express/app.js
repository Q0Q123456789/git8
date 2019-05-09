let express = require("express");

// 日志
const log4js = require('log4js');
log4js.configure('model/log4j.json');

let app = express(); /*实例化使用*/
// let fs = require("fs");

let bodyParser = require('body-parser');
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'trace' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/upload",express.static("upload"));
app.use("/audio",express.static("audio"));

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Cookie", '');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, MUserAgent, MToken, UID, setCookie,x-access-token,X-URL-PATH");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
});

//仓库
let api  = require('./api/server.js');
app.post('/performance/model/warehousing',api.warehousing); //获取仓库信息

//登录
let login  = require('./api/login.js');
app.post('/performance/model/login',login.login); //登录
app.post('/performance/model/addName',login.addName); //注册
app.get('/performance/model/findUser',login.findUser); //获取用户登录信息

//上传图片
let upload  = require('./api/upload.js');
app.post('/performance/model/upload',upload.upload);
app.post('/performance/model/uploadFile',upload.uploadFile); //上传文件
app.get('/performance/model/download',upload.download); //下载文件
app.post('/performance/model/del',upload.del); //删除文件
//查询
let query  = require('./api/query.js');
app.post('/performance/model/query',query.query);
app.post('/performance/model/findQuery',query.findQuery);
app.get('/performance/model/images',query.images);

//删除

let del = require('./api/delete.js');
app.post("/performance/model/delete",del.delete);

app.get("/performance/model/hello", function(request, response){
    response.send("hello!");
});
//获取日志
let logs = require('./api/logs.js');
app.get("/performance/model/log", logs.logs);
// app.get("/performance/model/log", function(request, response){
//     var data = fs.readFileSync('./logs/error/error.log');
//     // response.json(data.toString());
//     response.send(data.toString());
// });
app.listen(10086);
console.log('Listening on port 10086······');