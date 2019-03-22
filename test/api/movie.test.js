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
	
	describe('/POST movie', () => {
		it('it should POST a movie', (done) => {
			const movie = {
				title: 'Udemy',
				director_id: '5c8e804fa869954adc185d20',
				category: 'Komedi',
				country: 'Türkiye',
				year: 1950,
				imdb_score: 8
			};

			chai.request(server)
				.post('/api/movies')
				.send(movie)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('title');
					res.body.should.have.property('director_id');
					res.body.should.have.property('category');
					res.body.should.have.property('country');
					res.body.should.have.property('year');
					res.body.should.have.property('imdb_score');
					done();
				});
		});
	});




});
