const jwt = require('jsonwebtoken'); //jwt dahil edildi

module.exports = (req, res, next) => {
	// 3 şekilde alınabilir
	// 1-postmanda header kısmına x-acc eklenerek
	// 2-post metonunda token diyip yazarak
	// 3-/api/movies?token= yazarak
	const token = req.headers['x-access-token'] || req.body.token || req.query.token

	if(token){//token girildiyse
		jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
			if (err){//token geldi ama yanlış
				res.json({
					status: false,
					message: 'Failed to authenticate token.'
				})
			}else{//doğrulandı
				req.decode = decoded; //decoded ekle 
				next();//devam et başkan
			}
		});
	}else{//token hiç gelmedi
		res.json({
			status: false,
			message: 'No token provided.'
		})
	}
};
