var express = require('express')
var news = require('../db/database.js').huxiu;
var app = express();
var path = require('path')

//设置模板引擎和模板文件的位置
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public/'));

//首页
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

app.get('/test', function(req, res){
	res.render('index', {title: '测试首页'});
});


//监听4500端口
app.listen(4500, function(){
	console.log("app is running...")
})