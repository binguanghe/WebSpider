var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/spider');
var Schema = mongoose.Schema;

//定义新闻文档
var newsSchema = new Schema(
    {
        website : String,
        num : Number,
        title : String,
        url : String
    },
    { versionKey: false }//关闭版本锁
);

var user = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		likedSites: {
			type: Array
		}
   },
   { versionKey: false }
);

var userModel = db.model('user',user);


//抓取的站点
var arrayOfSchema = [
	'huxiu',
	'ITHome',
	'jianshu',
	'aifaner',
	'OSCFrontEnd',
	'CSDN'
];

//集合模型数组
var arrayOfModel = [];

//批量绑定集合模型
for(var i=0;i<arrayOfSchema.length;i++){
	arrayOfModel.push(db.model(arrayOfSchema[i],newsSchema));
}

export { userModel, arrayOfModel };