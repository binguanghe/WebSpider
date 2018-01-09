import { huxiu, kr36 } from '../db/database.js'


var rulerOfHuxiu = {
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
var rulerOf36kr = {
	getOptions: {
		host: "www.36kr.com",
		path: "",
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36'
	    }
	},
	className: ".am-cf inner_li inner_li_abtest",
	collectionName: kr36,
	num: 0,
	website: "36kr",
	title: "$(this).('a')",
	url: ''
}

var rulers = [rulerOfHuxiu, rulerOf36kr];

export { rulers };
