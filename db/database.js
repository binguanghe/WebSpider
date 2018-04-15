var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/spider');
var Schema = mongoose.Schema;

var newsSchema = new Schema(
    {
        website:String,
        num : Number,
        title : String,
        url : String
    },
    { versionKey: false}//关闭版本锁
);

var arrayOfSchema = ['huxiu','baijia'];
var arrayOfModel = [];
for(var i=0;i<arrayOfSchema.length;i++){
	arrayOfModel.push(db.model(arrayOfSchema[i],newsSchema));
}
export { arrayOfModel };