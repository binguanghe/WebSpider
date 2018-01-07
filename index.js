var http = require('http');
var fs = require('fs');
var https = require('https');
var cheerio = require('cheerio');

//数据库spider集合news
var news = require('./db/database.js').news;

//请求函数
function Spider(ruler){
	https.get(ruler.getOptions, function(res){
		var html = '';
		res.setEncoding('utf-8');
		//监听data事件
		res.on('data', function(chunk){
			html += chunk;
		});
		//监听end事件,响应接收完成后处理
		res.on('end', function(){  
			var $ = cheerio.load(html);
			$(ruler.className).each(function(index, item){
				var NewsEntity = new news({
				    num: ruler.num+=1,
				    website: ruler.website,
				    title: eval(ruler.title),
				    url: eval(ruler.url)
				});

				//保存数据到数据库
				NewsEntity.save(function(err, doc){
				    if(err){
				        console.log("err"+err);
				    }else{
				        console.log(doc)
				    }
				});
		  });	
		});
	});
}

//定义规则
var ruler = {
	getOptions: {
		host: "www.huxiu.com",
		path: "",
		headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
	    }
	},
	className: ".mob-ctt",
	num: 0,
	website: "虎嗅网",
	title: "$(this).children().children().first().text()",
	url: '"https://www.huxiu.com" + $(this).children().children().first().attr("href")',
}
Spider(ruler)