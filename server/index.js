const express = require('express');
var app = express();
var methods = require('./methods');
var router = require('./router');
var bodyParser = require('body-parser');
var cs = require('cookie-session')
app.use(bodyParser.urlencoded({
  extended:false
}))

app.use(cs({
    name:'sessionId',
    keys:['echo']
}))

app.use(bodyParser.json())
//踩坑 引用bodyParser中间件时 需要放在引用路由前

app.use(express.static('public'));
app.use(router);

app.listen(3000,function(){
  console.log('恭喜您，已成功连接3000端口')
})