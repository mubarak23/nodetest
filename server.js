var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var ejs = require('ejs');
var engine = require('ejs-mate');
var passportConf = require('./passport');
var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:root123@ds251240.mlab.com:51240/nodehome',
 { useNewUrlParser: true },  function(err) {
		if(err){
			console.log(err);
		}else{
			console.log('connected to the DB');
		}
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUnitialized: true,
	secret: "Hello",
	store: new MongoStore({ url: 'mongodb://root:root123@ds251240.mlab.com:51240/nodehome', autoReconnect: true })
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res, next){
	res.render('home');
})

app.get('/login', function(req, res, next){
	if(req.user) return res.redirect('/');
	res.render('login');
});

app.post('/login', passport.authenticate('local-login', {
	successRedirect: '/profile',
	failureRedirect: '/login',
}));

app.get('/profile', function(req, res, next){
		res.render('profile');
});


app.post('/create_user', function(req, res, next) {
		var user = new User();
			user.email = req.body.email;
			user.password = req.body.password;
			user.save(function(err){
				if(err){
					console.log(err);
				}else{
					res.json(user);
				}
			})
});

app.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/')
})


app.listen(500, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("App Running on Port 500");
		}
});
