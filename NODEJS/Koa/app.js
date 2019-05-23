const Koa = require('koa');
const Api = require('koa-router')();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror =require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const cors = require('koa2-cors');
const DB = require('./db/db.js');
const config = require('./db/config.js');
const register = require('./api/register.js');
const common = require('./db/common.js');
const app = new Koa();

app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(cors()));
// app.use(convert(server(__dirname+'/public')));
app.use(co.wrap(function* (ctx, next) {
    const start = new Date();
    yield next();
    const ms = new Date() - start;
    console.log(`${ ctx.method } ${ ctx.url } - ${ ms }ms`);
}));

Api.get('/api',async (ctx,next) => {
    let sql = 'SELECT * from login';
    await DB.find(sql).then(res =>{
        config.Success.data = res;
        console.log(res);
    }).catch( err => {
        console.log(err);
    });
    ctx.body = config.Success;
});

Api.get('/query', async (ctx, next) => {
    let level = ctx.query
    console.log(ctx.query)
    let sql = `SELECT * from T_Area where level=${level.level} or parentId=${level.parentId}`;
    // let sql = 'SELECT * from T_Area';
    await DB.find(sql).then(res => {
        let map = {}
        res.forEach(element => {
            map[element.areaId] = element
        });
        let val = [];
        res.forEach(function (item) {
            let parent = map[item.parentId];
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                val.push(item);
            }
        })
        config.Success.data = val;
        
    }).catch(err => {
        console.log(err);
    });
    ctx.body = config.Success;
});





Api.post('/user',async (ctx ,next) => {
    let sql = 'INSERT into login(name,password) VALUES(?,?)';
    let params = ['admin1','123456'];
    let data;
    try {
        data = await DB.update(sql,params);
        console.log(data);
        config.Success.data = data;
    } catch (e) {
        console.log(e);
    }
    ctx.body = config.Success;
});
//添加用户
Api.post('/register',register);

app.use(Api.routes());

app.on('error',function(err,ctx){
    console.error('server error',err,ctx);
});

app.listen(3000);
console.log('nodeJS------port:3000-------启动成功！');