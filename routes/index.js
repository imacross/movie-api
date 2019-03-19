const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs'); //password şifreleme için

//Modals include

const User = require('../models/User.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//token oluşturma 
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
	const {username, password} = req.body; //username ve pass aldık

	User.findOne({ //username i aradı ve esitledi
		username
	},(err,user) => { 
		//hata varsa
		if(err)			//hata varsa throw et
			throw err;

		if(!user){ //user yoksa
			res.json({
				status: false,
				massage: 'Auth Failed, user not found!'
			});
		}else{//user varsa
			bcrypt.compare(password,user.password).then((result)=>{ //karsilastirma
				if(!result){//şifre yanlışsa
				res.json({
					status: false,
					massage: 'Auth Failed, wrong password'
				});//config.js  oluşturduk app.js e ddahil ettik
				}else{//şifrede doğruysa token oluştur
					const payload = {//payload username esitleme
						username
					};
					//ilk payload, iki configteki, üç ayar.
					const token = jwt.sign(payload,req.app.get('api_secret_key'),{
						expiresIn: 720 // 12 saat izin verildi
					});
					//tokenı döndür. token = token
					res.json({
						status: true,
						token
					});
				}
			});
		}
	});
});

module.exports = router;
