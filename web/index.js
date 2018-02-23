var express = require('express')
var news = require('../db/database.js').huxiu;
var app = express();

//请求根路径
app.get('/', function(req, res){
	news.find({}, {"num":1,"title":1,"url":1,"_id":0}, function(err, result){
		if(err){
			console.log(err);
		}else{
			 var newsList = (function(){
			 	var total = "";
			 	for(var i=0;i<result.length;i++){
			 		total += "<a target='_blank' href=" + result[i].url+ ">" + result[i].title + "</a>" + "</br></br>";
			 	}
			 	return total;
			 })()
			 res.send(newsList);
			 res.end();
		}
	})
});
	

//监听4500端口
app.listen(4500, function(){
	console.log("app is running...")
})