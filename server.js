var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var app = express();

mongoose.connect('mongodb://root:root123@ds251240.mlab.com:51240/nodehome', function(err) {
		if(err){
			console.log(err);
		}else{
			console.log('connected to the DB');
		}
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	resave: true;
	saveUnitialized: true;
	secret: "Hello";
	store: new MongoStore({ url: 'mongodb://root:root123@ds251240.mlab.com:51240/nodehome', autoReconnect: true;});
}));

app.listen(500, function(err){
		if(err){
			console.log(err);
		}else{
			console.log("A