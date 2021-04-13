const { query } = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host:'127.0.0.1',
	user:'root',
	password:'123456',
	database:'blog',
    multipleStatements: true
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
        let title = data.query ? data.query : ""
        let category = data.category ? `AND category =  ${data.category} ` : ""
        var sql = "select article.*,category_name from article LEFT JOIN classification ON classification.id = article.category where title like '%" + title + "%' " + category +"  ORDER BY add_time DESC"
        console.log(sql)
	    connection.query(sql,function(err,res){
			var data = res;
			callback(data);
		})
  },
  getArtListByIdSql:function(callback,data){
      let wh = data.query ? data.query : ""
      let sql = "select article.*,category_name from article LEFT JOIN classification ON classification.id = article.category where user_id = " + data.user_id + " and title like '%" + wh + "%' ORDER BY add_time DESC";
      console.log(sql)
      connection.query(sql,function(err,res){
          var data = res;
          callback(data);
      })
  },
  //查询文章详情
  getArtDetailSql:function(callback,data){
    var sql = "select * from article where id = " + data.id;
    var sqlReadNum = "update article set read_num = read_num + 1 where id = " + data.id;
    console.log(sql)
		connection.query(sql, function(err,res){
			var data = res;
			callback(data);
		})
        connection.query(sqlReadNum, function(err,res){
			
		})
  },
  //根据id删除文章
  postDelArticleSql:function(callback,data){
    var sql = "delete from article where id = " + data.articleId;
    console.log(sql)
    connection.query(sql,function(err,res){
        var data = res;
        callback(data);
    })
  },
  //更新文章
  updateArtSql:function(callback,data){
    var sql = `UPDATE article SET title='${data.title}', cover='${data.cover}', remark='${data.remark}', category=${data.category}, add_time='${data.add_time}', content='${data.content}' where id = ${data.articleId}`
    console.log(sql)
    connection.query(sql,function(err,res){
        var data = res;
        callback(data);
      })
  },
  //留言查询
  getRemarkSql:function(callback, data){
      //SELECT r.*, u.userName from review r JOIN user u ON r.user_id = u.id
      var sql = "select review.*,userName from review LEFT JOIN user ON user.id=review.user_id where user.id=review.user_id ORDER BY add_date DESC";
      console.log(sql)
      connection.query(sql,function(err,res){
        var data = res;
        callback(data);
      })
  },

  //创建留言
  postCreateRemarkSql:function(callback, data){
    let sql = "insert into review( user_id, review, add_date) values (" + data.user_id +",'" + data.review + "','" + data.add_date +"')"
    console.log(sql)
    connection.query(sql,function(error,result){
        if(error){
          console.log("操作错误");
          return;
        }
        callback(result)
    })
  },
  //查询标签列表
  getLableListSql:function(callback, data){
      let sql = "select * from classification"
      console.log(sql)
      connection.query(sql,function(err,res){
        var data = res;
        callback(data);
      })
  },
  //新增标签
  createLableSql:function(callback, data){
      let sql = "insert into classification( category_name ) values ('" + data.category + "')"
      console.log(sql)
      connection.query(sql,function(err,res){
          var data = res;
          callback(data)
      })
  },
  //删除标签
  delLableSql:function(callback, data){
      let sql = "delete from classification where id = " + data.id;
      console.log(sql)
      connection.query(sql,function(err,res){
          var data = res;
          callback(data)
      })
  }
}