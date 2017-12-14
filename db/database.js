var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/spider');
var Schema = mongoose.Schema;

//news
var newsSchema = new Schema(
    {
        num : Number,
        title : String,
        url : String
    },
    { versionKey: false}//关闭版本锁
);

exports.news = db.model('news', newsSchema);
