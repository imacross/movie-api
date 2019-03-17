const express = require('express');
const router = express.Router();

//models import ediliyor
const Director = require('../models/Director.js')

//ALLGET DIRECTORS
router.get('/',(req,res)=>{

	const promise = Director.find({  }); //promise find ile arama yapılıyr
	
	promise.then((data)=>{ //data dönsün
		res.json(data);
	}).catch((err)=>{ //error dönsün
		res.json(err);
	});
 })

//DIRECTORS NEW CREATE
router.post('/',(req,res,next)=>{

	const director = new Director(req.body);
	const promise = director.save();
	promise.then((data)=>{ //data dönsün
		res.json(data);
	}).catch((err)=>{ //error dönsün
		res.json(err);
	});
 })

module.exports = router;
