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

var huxiu = db.model('huxiu', newsSchema);
var kr36 = db.model('kr36', newsSchema);

export { huxiu, kr36 }