/*
   2018-07-25
 */

let Mongo=require('mongodb');
let MongoClient=Mongo.MongoClient;
let ObjectID=Mongo.ObjectID;

let options={
    host:'mongodb://localhost:27017/',
    library:'config'
}

/*连接数据库*/
function _connectDB(callback){
    let url = options.host + options.library;
    MongoClient.connect(url,function(err,db){

        if (err) {
            console.log('数据库连接失败...');
            callback(err, null);
            return;
        }
        callback(err, db);
        console.log('数据库连接成功...');
    })
}
//深拷贝
function extend() {
    let length = arguments.length;
    let target = arguments[0] || {};
    if (typeof target!=="object" && typeof target !== "function") {
        target = {};
    }
    if (length === 1) {
        target = this;
        i--;
    }
    for (let i = 1; i < length; i++) {
        let source = arguments[i];
        for (let key in source) {
            // 使用for in会遍历数组所有的可枚举属性，包括原型。
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}

let mongodb = function (data) {
    options = extend(options,data);
};
mongodb.prototype={
    count:function (collectionName,json,callback) {
        _connectDB(function(err,db){
            db.collection(collectionName).count(json, function (err, result) {
                callback(err, result);
                db.close(); //关闭数据库
            })
        })
    },
    /*插入数据*/
    insertOne:function (collectionName, json1, json2, callback) {
        _connectDB(function (err, db) {
            db.collection(collectionName).updateOne(
                json1,
                json2,
            function (err, results) {
                callback(err, results);
                db.close();//关闭数据库
            });
        })
    },
    /*更新数据*/
    //修改一条
    updateOne:function (collectionName, json1, json2, callback) {
        _connectDB(function (err, db) {
            db.collection(collectionName).updateOne(
                json1,
                json2,
            function (err, results) {
                callback(err, results);
                db.close();//关闭数据库
            });
        })
    },
    //修改全部
    updateMany:function (collectionName, json1, json2, callback) {
        _connectDB(function (err, db) {
            db.collection(collectionName).updateMany(
                json1,
                json2,
            function (err, results) {
                callback(err, results);
                db.close();//关闭数据库
            });
        })
    },
    //查找
    find:function (collectionName, json, C, D) {
        let result = [];    //结果数组
        if (arguments.length === 3) {
            //那么参数C就是callback，参数D没有传。
            var callback = C;
            var skipnumber = 0;
            //数目限制
            var limit = 0;
        } else if (arguments.length === 4) {
            var callback = D;
            var args = C;
            //应该省略的条数  1
            var skipnumber = args.pageSize * (args.page-1) || 0;
            //数目限制
            var limit = args.pageSize || 20;
            //排序方式
            var sort = args.sort || {};
        } else {
            throw new Error("find函数的参数个数，必须是3个，或者4个。");
            return;
        }
        _connectDB(function(err,db){

            if(err){ /*数据库连接失败*/

                console.log('数据库连接失败');
                return;
            }
            var userRel=db.collection(collectionName).find(json).skip(skipnumber).limit(limit).sort(sort);;
            userRel.each(function(err, doc) {
                if(err){
                    res.write("游标遍历错误");
                    return;
                }
                if (doc != null) {
                    result.push(doc);
                } else {
                    //遍历完毕
                    db.close();
                    callback(err,result);
                }
            });

        })

    },
    deleteMany:function (collectionName, json, callback) {
        _connectDB(function (err, db) {
            //删除
            db.collection(collectionName).deleteMany(
                json,
                function (err, results) {
                    callback(err, results);
                    db.close(); //关闭数据库
                }
            );
        });
    }
};

module.exports = mongodb;