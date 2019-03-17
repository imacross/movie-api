const express = require('express');
const router = express.Router();

//models import ediliyor
const Director = require('../models/Director.js')

//ALLGET DIRECTORS
router.get('/',(req,res)=>{
	//yönetmen film ilişkisi
	const promise = Director.aggregate([
		{
			$lookup:{ // join işlemi
				from: 'movies', //nereyle join edilecek collections la
				localField: '_id', //director tablosundan hangi alanla eşleştireceksin
				foreignField: 'director_id',    //movies te hangi collection ile eşleşecek
				as:'movies'//nereye atanacak, title year gibi
			}
		},
			{
				$unwind: {
					path: '$movies',
					preserveNullAndEmptyArrays: true //filmi olmayan yönetmenleride bas
				}
			},
		{ //yönetmenlerin tüm filmleri tek çatı altında sıralansın
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				}, 
				movies: {
					$push: '$movies'
				}
			}
		},
		{ // id içinde id olayını düzeltir
			$project: {
				_id:'$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);
	
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

//DIRECTOR FINDBYID

router.get('/:director_id', (req, res, next) => {
	const promise = Director.findById(req.params.director_id);

	promise.then((director) => {
		console.log(director);
		if (!director)
			next({ message: 'The movie was not found.', code: 99 });

		res.json(director);
	}).catch((err) => {
		res.json(err);
	});
});

//DIRECTOR GUNCELLEME
router.put('/:director_id', (req, res, next) => {
	const promise = Director.findByIdAndUpdate(req.params.director_id,req.body,{
		new:true
	});

	promise.then((director) => {
		console.log(director);
		if (!director)
			next({ message: 'The movie was not found.', code: 99 });

		res.json(director);
	}).catch((err) => {
		res.json(err);
	});
});


//DIRECTOR DELETE
router.delete('/:director_id', (req, res, next) => {
	const promise = Director.findByIdAndRemove(req.params.director_id);

	promise.then((director) => {
		console.log(director);
		if (!director)
			next({ message: 'The movie was not found.', code: 99 });

		res.json({status:1});
	}).catch((err) => {
		res.json(err);
	});
});
module.exports = router;

