const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp); //http modülünü kullandık

describe('Node Server', () => { //'' içindeki tanım birden fazla it olabilir
	it('(GET /) returns the homepage', (done) => {
		chai.request(server)// servere istek gönder
			.get('/')// / işaretine olsun
			.end((err, res) => {//istek biterken
				res.should.have.status(200); //status kodu 200 olmalı
				done(); // herşey tamam
			})
	});
});
