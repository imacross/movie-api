const mongoose = require('mongoose'); //Mongoose dahil edildi
const Schema = mongoose.Schema; // schema değişkeni mongoose.schema ya atandı

const MovieSchema = new Schema({ //movie için yeni şema oluşturuldu
	director_id: Schema.Types.ObjectId,
	title:{
		type: String,
		required: True
	},
	category: String,
	country: String,
	year: Number,
	imdb_score: Number,
	date: {
		type:	Date,
		default:Date.now
	}
});

module.exports = mongoose.model('movie',MovieSchema); // şemayı dışarı aktardık
