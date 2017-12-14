var express = require('express')
var news = require('../db/database.js').news;
var app = express();

//请求
app.get('/', function(req, res){
	news.find({num:1}, function(err,result){
		if(err){
			console.log(err);
		}else{
			res.send("<a href=" + result[0].url + ">" + result[0].title + "</a>");
		}
	})
});
	

//监听端口
app.listen(4500, function(){
	console.log("app is running...")
})