var express = require('express');
var async = require('async');
var server = express();
var path = require('path')
import { arrayOfModel } from '../db/database.js'

//设置模板引擎和模板文件的位置
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(__dirname + '/public'));

//一次性查询的结果
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

//同步查询集合
async function asyncFind(){
	for(let i =0;i<=arrayOfModel.length;i++){
		await selectWebsite(arrayOfModel[i],5);
	}
}
asyncFind();

//首页路由及数据绑定
server.get('/', function(req, res){
	res.render('index', {title: '首页',siteBlock: totalOut});
	res.end();	
});

//监听4500端口
server.listen(80, function(){
	console.log("server is running...")
})