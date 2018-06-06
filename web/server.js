var express = require('express');
var server = express();
var async = require('async');
var path = require('path')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
import { userModel,arrayOfModel } from '../db/database.js'
import { rulers } from '../ruler/ruler.js'

//设置模板引擎和模板文件的位置
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(__dirname + '/public'));
server.use(cookieParser('sessiontest'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({
  secret : 'sessiontest', // 建议使用 128 个字符的随机字符串
  cookie : { maxAge: 60000*60*24 },//session有效时间为一天
  resave : true,
  saveUninitialized : true
}));

//测试代码
/*server.use(function(req, res, next) {
    console.log(typeof req.next);

    next();
});*/

//未登录的首页新闻一次性查询的结果
var totalOut = "";

//供给用户选择的网站数组
var arrayOfAllSites = [];

//真正的查询网站结果排序
var arrayOfTrueResult = [];

//网站集合选择函数，即数据库网站集合选择
function selectWebsite(websiteCollectionName,displayQuantity){
	if(websiteCollectionName){
		websiteCollectionName.find({}, {"num":1,"website":1,"title":1,"url":1,"_id":0}, function(err, result){
			if(err){
				console.log("数据库查询错误：" + err);
			}else{
				arrayOfTrueResult.push(result[0].website);
				var userSigleSite = "";
				totalOut += "<div style='border:2px solid #e6e6e6; color:#343a40' class='col-lg-6 col-xs-12'>" + "<h3>" + result[0].website + "</h3>";
				userSigleSite = "<div style='border:2px solid #e6e6e6; color:#343a40' class='col-lg-12 col-xs-12'>" + "<h3>" + result[0].website + "</h3>";
			 	for(var i=0;i<displayQuantity;i++){
			 		totalOut += "<a target='_blank' href=" + result[i].url+ ">" + (i+1) + ". " + result[i].title + "</a>" + "</br>";
			 		userSigleSite += "<a target='_blank' href=" + result[i].url+ ">" + (i+1) + ". " + result[i].title + "</a>" + "</br>";
			 	};
				totalOut += "</div>";
				userSigleSite += "</div>";
				arrayOfAllSites.push(userSigleSite);
			}
		});
	}		
}

//同步查询集合
(async function(){
	for(let i =0;i<arrayOfModel.length;i++){
		try{
			await selectWebsite(arrayOfModel[i],20);
		} catch (e){
			console.log(e);
		}
	}
})();



//首页
server.get('/', function (req, res) {
    if(req.session.userName){
		res.redirect('/user');
	}else{
		res.render('index',{title:'首页', siteBlock: totalOut});
	}
});

// 用户登录get请求
server.get('/login', function(req, res){
	if(req.session.userName){
		res.redirect('/user');
	}else{
		res.render('login',{title:'登录页面'});
	}
});

// 用户登录post请求
server.post('/login', function(req, res){
	userModel.find({ username : req.body.username, password : req.body.password }, function(err, result){
		if(result.length > 0){
			if( req.body.username == result[0].username && req.body.password == result[0].password ){
				req.session.userName = req.body.username; // 登录成功，设置 session
				res.redirect('/user');
			}
		}else{
			res.send('账号或密码错误！请<a href="/login">重新登录</a>！');// 若登录失败，提供链接重定向到登录页面
		}
	})
});

//用户注册get请求
server.get('/register', function(req, res){
    if(req.session.userName){
        res.redirect('/user');//若已登陆，则重定向到用户页面
    }else{
        res.render('register', { title : "注册页面" });// 若未登录，重定向到登录页面
    }
});

// 用户注册post请求
server.post('/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
    userModel.find({ username : req.body.username }, function(err, result){
		if(result.length > 0){
			if( req.body.username == result[0].username ){
				res.send('账号已存在！请<a href="/register">重新注册</a>！');// 若登录失败，重定向到登录页面
			}
		}else{
			var newUser = new userModel({
				username : username,
				password : password
			});
			newUser.save(function(err, doc){
				if(err){
					console.log("账号保存失败！"+ err);
				}else{
					req.session.userName = req.body.username; // 注册成功，保存session
					res.send('注册成功!<a href="/user">前往用户中心</a>！');
				}
			})
		}
	})
});

// 用户中心
server.get('/user', function (req, res) {
    if(req.session.userName){  //判断session 状态，如果有效，则返回用户中心，否则转到登录页面
    	userModel.find({ username : req.session.userName },function(err,result){
    		if(err){
    			console.log(err);
    		}else{
    			/*var userLikedSitesArray = result[0].likedSites;*/
    			var userLikedSitesArray = "";
    			for(var i=0;i<result[0].likedSites.length;i++){
    				userLikedSitesArray += arrayOfAllSites[result[0].likedSites[i]];
    			}
    			res.render('user',{ title : "用户界面", username : req.session.userName, userLikedSitesModel : userLikedSitesArray});
    		}
    	})
		
    }else{
        res.redirect('/login');
    }
})

//（新闻网站的设置，用于添加删除等）
server.get('/manage', function (req, res) {
    if(req.session.userName){  //判断session 状态，如果有效，则进入网站管理页面，否则转到登录页面
    	var allSitesModel = ''
    	for(var item =0;item<arrayOfTrueResult.length;item++){
    		allSitesModel += '<label><input type="checkbox" name= ' + arrayOfTrueResult[item] + ' value=' + item + '>' + arrayOfTrueResult[item] + '</label><br>';
    	}
    	res.render('manage',{ title : "网站定制中心", username : req.session.userName, allSitesModel : allSitesModel});
    }else{
        res.redirect('/login');
    }
})

//post提交感兴趣网站
server.post('/manage', function(req, res){
	if(req.session.userName){
		var indexOfLikedSitesArray = [];
		for(var item in req.body){
			indexOfLikedSitesArray.push(parseInt(req.body[item]));
		}
		userModel.findOneAndUpdate({ username : req.session.userName}, { likedSites : indexOfLikedSitesArray}, function(err,result){
			if(err){
				console.log("保存感兴趣网站失败：" + err);
			}else{
				//上次感兴趣的网站
				//console.log(result);
			}
		})
		res.redirect('/user');
	}
});

// 退出
server.get('/logout', function (req, res) {
    req.session.userName = null; // 删除session
    res.redirect('/');
});

server.get('*',function(req, res){//无效路由处理：返回首页，此配置须放在所有路由配置的最后
	res.redirect('/');
})
//监听4500端口
server.listen(80, function(){
	console.log("server is running...");
})

console.log(totalOut);