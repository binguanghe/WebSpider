var http = require('http');
var https = require('https');
import { huxiu, kr36 } from '../db/database.js'

//存放规则的数组
var rulers;

//规则名称
var rulerOfHuxiu,
	rulerOf36kr;

//虎嗅网
rulerOfHuxiu = {
	protocol: https,
	getOptions: {
		host: "www.huxiu.com",
		path: "",
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
	    }
	},
	className: ".mob-ctt",
	collectionName: huxiu,
	num: 0,
	website: "虎嗅网",
	title: "$(this).children().children().first().text()",
	url: '"https://www.huxiu.com" + $(this).children().children().first().attr("href")'
}

//36kr
rulerOf36kr = {
	protocol: http,
	getOptions: {
		host: "36kr.com",
		path: "",
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
	    }
	},
	className: ".img_box",
	collectionName: kr36,
	num: 0,
	website: "36kr",
	title: "$(this).children().first.attr('href')",
	url: ''
}

rulers = [rulerOfHuxiu, rulerOf36kr];

export { rulers };
