var mysql = require('mysql');

var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'123456',
	database:'blog'
});

connection.connect();

module.exports = {
  select:function(callback,data){
    var sql = "select * from user where " + 'userName=' +"'"+ data.userName +"'"+ ' and pwd=' +"'"+data.pwd+"'";
    console.log(sql)
		connection.query(sql,function(err,res){
			var da = res;
			callback(da);
		})
  },
  operateSql:function(sql,callback){
    console.log(sql)
    connection.query(sql,function(error,result){
      console.log(result)
      if(error){
        console.log("操作错误");
        return;
      }
      callback(result)
    })
  },

  //创建文章
  createArticeSql:function(sql,callback){
      connection.query(sql,function(error,result){
        console.log(result)
        if(error){
          console.log("操作错误");
          return;
        }
        callback(result)
      })
  },

  //查询文章
  getArtListSql:function(callback,data){
        let sql = "select * from article";
        console.log(sql)
	    connection.query(sql,function(err,res){
			var data = res;
			callback(data);
		})
  },
  getArtListByIdSql:function(callback,data){
      let sql = "select * from article where user_id = " + data.user_id ;
      connection.query(sql,function(err,res){
          var data = res;
          callback(data);
      })
  },
  //查询文章详情
  getArtDetailSql:function(callback,data){
    var sql = "select * from article where id = " + data.id;
    console.log(sql)
		connection.query(sql,function(err,res){
			var data = res;
			callback(data);
		})
  },
}