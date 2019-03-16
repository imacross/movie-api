const express = require('express');
const router = express.Router();

//models import ediliyor
const Movie = require('../models/Movie.js')

router.post('/',(req, res, next) => {
	//req.body nesnesinden atamalar yapılıyor
	//const {title,imdb_score,category,country,year} = req.body;
	//yeni bir movie ekleniyor
	const movie = new Movie(req.body);
		//title:title,
		//imdb_score:imdb_score,
		//category:category,
		//country:country,
		//year:year
	//});
	//yeni kaydediliyor
	movie.save((err,data)=>{
		if(err)
			res.json(err);
		res.json(data);
	});

});

module.exports = router;
