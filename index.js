var http = require('http');
var fs = require('fs');
var https = require('https');
var cheerio = require('cheerio');

//数据库spider集合news
var news = require('./db/database.js').news;

var options = {
	host: "www.huxiu.com",
	path: "",
	headers: {
	'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
	}
};

//请求函数

function Spider(){
	https.get(options, function(res){
		var html = '';
		var titles = [];
		res.setEncoding('utf-8');
		//监听data事件
		res.on('data', function(chunk){
			html += chunk;
		});

		//监听end事件,响应接收完成后处理
		res.on('end', function(){  
			var $ = cheerio.load(html);
			var num = 0;
			$(".mob-ctt").each(function(index, item){
				//获取标题
				var title = $(this).children().children().first().text();
				//获取文章链接
				var url = "https://www.huxiu.com" + $(this).children().children().first().attr("href");
				var NewsEntity = new news({
				    num: num+=1,
				    title: title,
				    url: url
				});

				//保存数据到数据库
				NewsEntity.save(function(err, doc){
				    if(err){
				        console.log("err"+err);
				    }else{
				        console.log(doc)
				    }
				});
				//处理要插入数据库的数据
				/*var insertData = function(db){
					num += 1;
					var collection = db.collection('news');
					collection.insert({num,title,url}, function(err, result){
						if(err){
							console.log("ERR: "+err);
						}else{
							console.log(result);

						}
					})
				};

				//连接数据库并插入
				MongoClient.connect(DB_CONN_STR, function(err,db){
					insertData(db,function(){
						db.close();
					});
				})
			});*/
		
		  });	
		});
	});


}

Spider();