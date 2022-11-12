var chai =  require("chai");
var chaiHttp = require('chai-http');
var should = require("chai").should();
var app = require('../index.js');

chai.use(chaiHttp)
describe("Tests", () => {
    let id;

    before(function(done) {
        done()
    });

    after(function(done) {
        done()
    });

    describe('Valid POST API Call', function() {
        it('it should create a new contact', (done) => {
            chai.request(app)
            .post('/api/contacts')
            .send({
                name: "Jane Smith",
                gender: "female",
                email: "xyz@gmail.com",
                phone: "098765"
            })
            .end((err, res) => {
                res.status.should.equal(200);         
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                id = res.body.data._id;
                done();
            });
        }).timeout(8000);
    });

    describe('Valid GET API Call', function() {
        it('it should get the newly created contact', (done) => {
            chai.request(app)
            .get(`/api/contacts/${id}`)
            .send()
            .end((err, res) => {
                // console.log(res.body)
                res.status.should.equal(200);         
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data._id.should.equal(id);
                done();
            });
        });
    });
    
    let new_number = 999;
    describe('Valid PUT API Call', function() {
        it('it should change the phone number of newly created contact', (done) => {
            chai.request(app)
            .put(`/api/contacts/${id}`)
            .send({
                phone: new_number
            })
            .end((err, res) => {
                // console.log(res.body)
                res.status.should.equal(200);         
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data.phone.should.equal(`${new_number}`);
                done();
            });
        }).timeout(6000);
    });

    describe('Valid GET API Call', function() {
        it('it should check the phone number has been changed', (done) => {
            chai.request(app)
            .get(`/api/contacts/${id}`)
            .send()
            .end((err, res) => {
                // console.log(res.body)
                res.status.should.equal(200);         
                res.body.should.be.a('object');
                res.body.data.should.be.a('object');
                res.body.data.phone.should.equal(`${new_number}`);
                done();
            });
        });
    });

    describe('Valid DELETE API Call', function() {
        it('it should delete the newly created contact', (done) => {
            chai.request(app)
            .delete(`/api/contacts/${id}`)
            .send()
            .end((err, res) => {
                res.status.should.equal(200);         
                res.body.should.be.a('object');
                res.body.message.should.equal('Contact deleted');
                done();
            });
        });
    });


    describe('Invalid POST API Call', function() {
        it('it should get Validation Error due to missing name', (done) => {
            chai.request(app)
            .post(`/api/contacts/`)
            .send({
                //name: "Jane Smith", missing name to make this API call invalid
                gender: "male",
                email: "tyu@gmail.com",
                phone: "123765"
            })
            .end((err, res) => {
                // console.log(res.body)
                res.status.should.equal(400);         
                res.body.should.be.a('object');
                res.body.message.should.equal('contact validation failed: name: Path `name` is required.');
                done();
            });
        });
    });

    describe('Invalid PUT API Call', function() {
        it('it should get \'Invalid Contact ID provided.\'', (done) => {
            chai.request(app)
            .put(`/api/contacts/invalidid`)
            .send({
                //name: "Jane Smith", missing name to make this API call invalid
                gender: "male",
                email: "tyu@gmail.com",
                phone: "123765"
            })
            .end((err, res) => {
                // console.log(res.body)
                res.status.should.equal(404);         
                res.body.should.be.a('object');
                res.body.message.should.equal('Invalid Contact ID provided.');
                done();
            });
        });
    });

    describe('Invalid GET API Call', function() {
        it('it should get \'Not Found Error\'', (done) => {
            chai.request(app)
            .get(`/invalidpath`)
            .send()
            .end((err, res) => {
                // console.log(res.body)
                res.status.should.equal(404);         
                res.body.should.be.a('object');
                res.body.message.should.equal('Not Found Error');
                done();
            });
        });
    });

    describe('Invalid GET API Call', function() {
        it('it should get \'Not Found Error\'', (done) => {
            chai.request(app)
            .get(`/api/invalidpath`)
            .send()
            .end((err, res) => {
                // console.log(res.body)
                res.status.should.equal(404);         
                res.body.should.be.a('object');
                res.body.message.should.equal('Not Found Error');
                done();
            });
        });
    });
});