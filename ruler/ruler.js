var http = require('http');
var https = require('https');
import { arrayOfModel } from '../db/database.js'

//存放规则的数组
var rulers = [
	//虎嗅网
	{
		protocol: https,
		getOptions: {
			host: "www.huxiu.com",
			path: "",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
		    }
		},
		className: ".mob-ctt",
		collectionName: arrayOfModel[0],
		num: 0,
		website: "虎嗅网",
		title: "$(this).children().children().first().text()",
		url: '"https://www.huxiu.com" + $(this).children().children().first().attr("href")'
	},
	//百度百家
	{
		protocol: https,
		getOptions: {
			host: "baijia.baidu.com",
			path: "",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
		    }
		},
		className: ".title",
		collectionName: arrayOfModel[1],
		num: 0,
		website: "百度百家",
		title: "$(this).children().first().text().replace(/\\n/g, '')",
		url: '"https://baijia.baidu.com" + $(this).children().first().attr("href")'
	}
]

export { rulers };
