var http = require('http');
var https = require('https');
import { arrayOfModel } from '../db/database.js'

//存放规则的数组
export var rulers = [
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
	//IT之家
	{
		protocol: https,
		getOptions: {
			host: "it.ithome.com",
			path: "",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
		    }
		},
		className: ".title",
		collectionName: arrayOfModel[1],
		num: 0,
		website: "IT之家",
		title: "$(this).children().first().text()",
		url: '$(this).children().first().attr("href")'
	},
	//简书
	{
		protocol: https,
		getOptions: {
			host: "www.jianshu.com",
			path: "",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
		    }
		},
		className: ".title",
		collectionName: arrayOfModel[2],
		num: 0,
		website: "简书",
		title: '$(this).text()',
		url: '"https://www.jianshu.com" + $(this).attr("href")'
	},
	//爱范儿
	{
		protocol: http,
		getOptions: {
			host: "www.ifanr.com",
			path: "",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
		    }
		},
		className: ".cover-block",
		collectionName: arrayOfModel[3],
		num: 0,
		website: "爱范儿",
		title: '$(this).next().text()',
		url: '$(this).attr("href")'
	},
	//OSC前端
	{
		protocol: https,
		getOptions: {
			host: "www.oschina.net",
			path: "/blog?classification=428612",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
		    }
		},
		className: ".blog-title-link",
		collectionName: arrayOfModel[4],
		num: 0,
		website: "OSC前端",
		title: '$(this).children().first().text()',
		url: '$(this).attr("href")'
	},
	//CSDN
	{
		protocol: https,
		getOptions: {
			host: "www.csdn.net",
			path: "",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
		    }
		},
		className: ".title",
		collectionName: arrayOfModel[5],
		num: 0,
		website: "CSDN",
		title: '$(this).children().children().first().text().replace(/\\n/g, "").trim()',
		url: '$(this).children().children().first().attr("href")'
	}
];