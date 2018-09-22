const DB = require('../db/db');
const config = require('../db/config.js');
const common = require('../db/common.js');

const app = async (ctx ,next) =>{
    let body = ctx.header;
    let sql = `select * from login where name="${body.name}"`;
    let sql2 = `INSERT into login(name,password,uid,CreateDate) VALUES(?,?,?,?)`;
    let params = [body.name,common.sha256(body.password), common.sha256(body.name + body.password + common.initItme()), common.initItme()];
    let Ocommon = {};
    await DB.find(sql).then(res => {
        Ocommon.name = res[0];
    }).catch(err =>{console.log(err);});
    if ( Ocommon.name && Ocommon.name.Name ){
        config.error.data = '用户已存在！';
        return ctx.body = config.error;
    } else {
        await DB.update(sql2,params).then(res =>{
            config.Success.Status = 'OK'
        }).catch(err=>{console.log(err);});
        ctx.body = config.Success;
    }
};

module.exports = app;
console.log('添加用户启动---------成功！');