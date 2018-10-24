/**
 * Created by Administrator on 2017/5/12 0012.
 */
//配置文件

//数据库地址
// var DbUrl='mongodb://localhost:27017/ceramic';   /*操作的数据库*/
// var DbUrl='mongodb://localhost:27017/XZY_DataStorehouse';
var DbUrl='mongodb://localhost:27017/config';
// var DbUrl='mongodb://39.108.168.42:27017/XZY_DataStorehouse';

var obj = {};

// exports.DbUrl=DbUrl;
// exports.obj = obj;
module.exports={
    DbUrl,
    obj
};
