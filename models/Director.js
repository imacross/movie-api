const mongoose = require('mongoose'); //Mongoose dahil edildi
const Schema = mongoose.Schema; // schema değişkeni mongoose.schema ya atandı

const DirectorSchema = new Schema({ //movie için yeni şema oluşturuldu
	name: String,
	surname: String,
	bio: String,
	date:{
		type:Date,
		default:Date.now
	}
});

module.exports = mongoose.model('director',DirectorSchema); // şemayı dışarı aktardık
