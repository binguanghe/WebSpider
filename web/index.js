var express = require('express');
var baijia = require('../db/database.js').baijia;
var huxiu = require('../db/database.js').huxiu;
var async = require('async');
var app = express();
var path = require('path')

//设置模板引擎和模板文件的位置
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));//路由


var totalOut = "";
//网站集合选择函数，即数据库网站集合选择
function selectWebsite(websiteCollectionName,displayQuantity){
	websiteCollectionName.find({}, {"num":1,"website":1,"title":1,"url":1,"_id":0}, function(err, result){
		if(err){
			console.log("数据库查询错误：" + err);
		}else{
			totalOut += "<div class='col-lg-6 col-xs-12'>" + "<h3>" + result[0].website + "</h3>";
		 	for(var i=0;i<displayQuantity;i++){
		 		totalOut += "<a target='_blank' class='bg-info' href=" + result[i].url+ ">" + (i+1) + ". " + result[i].title + "</a>" + "</br>";
		 	};
			totalOut += "<a href='#'>More</a></div>";	 	
		}
	});
		
}

async function asyncFind(){
	var f1 = await function(){
		selectWebsite(baijia,10);
		console.log(1);
	};
	var f2 = await function(){
		selectWebsite(huxiu,10);
		console.log(2)
	};
	f1();
	f2();
	console.log("the end")
}

asyncFind();


app.get('/', function(req, res){
	res.render('index', {title: '首页',siteBlock: totalOut});
	res.end();	
});
//监听4500端口
app.listen(4500, function(){
	console.log("app is running...")
})