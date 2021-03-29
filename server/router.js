const express = require("express");
var route = express.Router();
var methods = require('./methods');

route
.get('/login',methods.login)
.post('/register',methods.register)
.post('/upload',methods.upload)
.post('/createArticle',methods.createArticle)
.get('/getArticleList',methods.getArticleList)
.get('/getArticleListById',methods.getArticleListById)
.get('/getArticleDetail',methods.getArticleDetail)

module.exports = route