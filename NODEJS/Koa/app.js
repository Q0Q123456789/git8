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
const Ajax = require('./api/register.js');
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
Api.get('/login',function (ctx,next) {

    ctx.body = {
        res:'100001',
        req:'成功！',
        list:[{
            username:'admin',
            password:'123456',
            sex:'男'
        }]
    }
});
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

Api.post('/user',async (ctx ,next) => {
    let sql = 'INSERT into login(name,password) VALUES(?,?)';
    let params = ['admin','123456'];
    let data;
    try {
        data = await DB.update(sql,params);
        config.Success.data = data;
    } catch (e) {
        console.log(e);
    }
    ctx.body = config.Success;
});

Api.post('/register',Ajax);

app.use( Api.routes());
app.on('error',function(err,ctx){
    log.error('server error',err,ctx);
});

app.listen(3000);