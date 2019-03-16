const mongoose = require('mongoose'); //mongoose dahil edilid

module.exports = () => { //mongoose dışarı aktaran fonksiyon
	mongoose.connect('mongodb://cagdas:cagdas99@ds127545.mlab.com:27545/heroku_cfvkp863') //mongodb mlab'e bağlandı
	mongoose.connection.on('open',() => {//trigger başarılı
		console.log("MongoDB:Connected");
	});

	mongoose.connection.on('error',(err) => {//trigger error
		console.log("MongoDB Error: "+err);
	});
}
