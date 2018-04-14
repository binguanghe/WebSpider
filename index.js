
var cheerio = require('cheerio');
import { rulers } from './ruler/ruler.js'

//请求函数
function Spider(ruler){
	ruler.protocol.get(ruler.getOptions, function(res){
		//抓到的数据
		var html = '';
		//设置编码，防止中文出现乱码
		res.setEncoding('utf-8');
		//监听data事件，分段获取抓取的数据
		res.on('data', function(chunk){
			html += chunk;
		});
		//监听end事件,响应接收完成后处理
		res.on('end', function(){  
			var $ = cheerio.load(html);
			//根据类名逐条遍历
			$(ruler.className).each(function(index, item){
				if(eval(ruler.title).search(/undefined/) == -1 && eval(ruler.url).search(/undefined/) == -1){//过滤抓到的无效标题/链接
					var collectionEntity = new ruler.collectionName({
					    num: ruler.num += 1,
					    website: ruler.website,
					    title: eval(ruler.title),
					    url: eval(ruler.url)
					});
					//保存数据到数据库
					collectionEntity.save(function(err, doc){
					    if(err){
					        console.log("Database err: " + err);
					    }else{
					        console.log(doc);
					    }
					});
				}
		    });	
		});
	});
}

for(var i=0;i<rulers.length;i++){
	Spider(rulers[i]);
}