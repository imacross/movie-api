const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp); 
let token;
describe('/api/movies test', () => {
	before((done) => {
		//token almamız lazım
		chai.request(server)//servere a request
			.post('/auth')//post metoduyla auth a
			.send({username:'test',password:'test123'})//kayıtlı kullanıcıyı gönder
			.end((err,res)=> {//biterken
				token = res.body.token; //cevapta gelen tokeni al
				done(); //bu işi bitir
			});
	});

	describe('GET movies', () => {
		it('it should be get movies',(done) => {
			chai.request(server)
			.get('/api/movies')
			.set('x-access-token',token)
				.end((err,res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');//dönen array olmalı
			done();
				});
		});
	
	});
});
