const express = require('express');
const router = express.Router();

//models import ediliyor
const Movie = require('../models/Movie.js')
// '/' için get isteği, tüm datalar geri dönsün
//ALLGET TUM KAYITLARI LISTELE

router.get('/', (req, res, next) => {
	const promise = Movie.find({  });

	promise.then((movie) => {
		if (!movie)
			next({ message: 'The movie was not found.', code: 99 });

		res.json(movie);
	}).catch((err) => {
		res.json(err);
	});
});

//TOP10 ISLEMI

router.get('/top10',(req,res)=>{

	const promise = Movie.find({ }).limit(10).sort({imdb_Score:1}); //promise find ile arama yapılıyr
	
	promise.then((data)=>{ //data dönsün
		res.json(data);
	}).catch((err)=>{ //error dönsün
		res.json(err);
	});
 })

//BETWEEN ISLEMI
router.get('/between/:start_year/:end_year',(req,res)=>{
	const {start_year,end_year} = req.params;
	const promise = Movie.find({  
		year:{ '$gte':parseInt(start_year), '$lte':parseInt(end_year) }
	}); //promise find ile arama yapılıyr
	
	promise.then((data)=>{ //data dönsün
		res.json(data);
	}).catch((err)=>{ //error dönsün
		res.json(err);
	});
 })

//DELETE ISLEMI	
router.delete('/:movie_id',(req,res)=>{

	const promise = Movie.findByIdAndRemove(req.params.movie_id); //promise find ile arama yapılıyr
	
	promise.then((data)=>{ //data dönsün
		res.json(data);
	}).catch((err)=>{ //error dönsün
		res.json(err);
	});
 })

// 'movies/api/:movie_id için arama yapar'

//ID YE GORE SORGULA
router.get('/:movie_id', (req, res, next) => {
	const promise = Movie.findById(req.params.movie_id);

	promise.then((movie) => {
		console.log(movie);
		if (!movie)
			next({ message: 'The movie was not found.', code: 99 });

		res.json(movie);
	}).catch((err) => {
		res.json(err);
	});
});

// 'movies/api/:movie_id için arama yapar'
//BUL VE DEGISTIR
router.put('/:movie_id', (req, res, next) => {
	const promise = Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});

	promise.then((movie) => {
		console.log(movie);
		if (!movie)
			next({ message: 'The movie was not found.', code: 99 });

		res.json(movie);
	}).catch((err) => {
		res.json(err);
	});
});

//YENI KAYIT EKLE
router.post('/',(req, res, next) => {//postla ekleme metodu
	//req.body nesnesinden atamalar yapılıyor
	//const {title,imdb_score,category,country,year} = req.body;
	//yeni bir movie ekleniyor

		//title:title,
		//imdb_score:imdb_score,
		//category:category,
		//country:country,
		//year:year
	//});
	//yeni kaydediliyor
	/*
	movie.save((err,data)=>{
		if(err)
			res.json(err);
		res.json(data);
	});
*/

	// yukardaki yapı yerine promise yapısı daha güvenli, db.js içerisine de ayarlama yapmak gerekli
	
	const movie = new Movie(req.body);
	const promise = movie.save(); // promise eşitledik

	promise.then((data)=>{
		res.json(data);
	}).catch((err)=>{
		res.json(err);
	});

});

module.exports = router;
