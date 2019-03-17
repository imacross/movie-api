const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs'); //password şifreleme için

//Modals include

const User = require('../models/User.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register', function(req, res, next) {
	const {username,password} = req.body;
	
bcrypt.hash(password, 10, (err, hash)=> {
  // Store hash in your password DB.
	
	//username = username gibi oluyor
	const user = new User({
		username,
		password:hash
	});
	
	const promise = user.save();
	promise.then((data)=>{
		res.json(data);
	}).catch((err)=>{
			req.json(err);
	});
});


});

//authenticate islemleri
router.post('/auth', (req,res) => {
	const {username, password} = req.body;

	User.findOne({
		username
	},(err,user) => {
		//hata varsa
		if(err)
			throw err;
		//user yoksa
		if(!user){
			res.json({
				status: false,
				massage: 'Auth Failed, user not found!'
			});
		}else{//user varsa
			bcrypt.compare(password,user.password).then((result)=>{
				if(!result){//şifre yanlışsa
				res.json({
					status: false,
					massage: 'Auth Failed, wrong password'
				});
				}else{//şifrede doğruysa token oluştur
					
				}
			});
		}
	});
});

module.exports = router;
