var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);


/********************************************/
/********************************************/
/********************USERS*******************/
/********************************************/
/********************************************/
describe('user', function() {
	var token;
  var user;
  var userID = null;
  var fautuser;

	beforeEach( function(done){
      done();
  	});

/*/USER POST OK*/
  it('should CREATE user on /user post', function(done) {
		chai.request(server)
    	.post('/users')
    	.send({"name": "Creation","email":"creation@hotmail.com","password":"12345", "teamColor":"red"})
    	.end(function(err, res){
        console.log(res.headers);
        user = res.body;
        userID = res.body._id;
        console.log(userID);
    		res.should.have.status(201);
    		done();
    	});
	});
  
/* /USERS GET ALL OK*/
  it('should list ALL user on /user GET', function(done) {
      chai.request(server)
      .get('/users')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

/* /USERS GET OK */
  it('should list a SINGLE user on /user/<id> GET', function(done) {

    chai.request(server)
      .get('/users/' + userID)
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  /* /USERS GET ERROR */
  it('should not list a SINGLE user on /user/<id> GET bad ID', function(done) {

    chai.request(server)
      .get('/users/58fc17864a5d632db8a23129')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
  });

  /*/USERS/LOGIN POST OK */
  it('should LOGIN user on /user post', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({"email":"creation@hotmail.com","password":"12345"})
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

    /*/USERS/LOGIN POST ERROR */
  it('should LOGIN user on /user post miss password', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({"email":"creation@hotmail.com"})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('password required');
        done();
      });
  });

      /*/USERS/LOGIN POST ERROR */
  it('should LOGIN user on /user post miss email', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({"password":"12345"})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('email required');
        done();
      });
  });

  /*/USERS/LOGIN POST ERROR */
  it('should LOGIN user on /user post bad email', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({"email":"mauvais@hotmail.com","password":"12345"})
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('No user found');
        done();
      });
  });

  /*/USERS/LOGIN POST ERROR */
  it('should LOGIN user on /user post bad password', function(done) {
    chai.request(server)
      .post('/users/login')
      .send({"email":"creation@hotmail.com","password":"mauvais5"})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('No matching password');
        done();
      });
  });

/* /USERS PUT OK */
it('should update a SINGLE user on /user/<id> PUT only name', function(done) {
  console.log(userID);
    chai.request(server)
      .put('/users/' + userID)
      .send({'name':'Changement'})
      .end(function(err, res){
        res.body.nModified.should.equal(1);
        res.should.have.status(200);
        done();
      });
  });

  it('should update a SINGLE user on /user/<id> PUT change name and password', function(done) {
  console.log(userID);
    chai.request(server)
      .put('/users/' + userID)
      .send({'name':'Changement', 'password':'11111'})
      .end(function(err, res){
        res.body.nModified.should.equal(1);
        res.should.have.status(200);
        done();
      });
  });

    it('should update a SINGLE user on /user/<id> PUT change only password', function(done) {
  console.log(userID);
    chai.request(server)
      .put('/users/' + userID)
      .send({'password':'0000'})
      .end(function(err, res){
        res.body.nModified.should.equal(1);
        res.should.have.status(200);
        done();
      });
  });

  /* /USERS PUT ERROR */
it('should not update a SINGLE user on /user/<id> PUT id bad user id', function(done) {
    chai.request(server)
      .put('/users/58fc17864a5d632db8a23129')
      .send({'name':'Changement'})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
  });

  it('should not update a SINGLE user on /user/<id> PUT try change email', function(done) {
    chai.request(server)
      .put('/users/' + userID)
      .send({'email':'changement@hotmail.com'})
      .end(function(err, res){
        console.log(res.text);
        res.text.should.equal("Can't change email");
        res.should.have.status(400);
        done();
      });
  });

  it('should not update a SINGLE user on /user/<id> PUT try change teamColor', function(done) {
    chai.request(server)
      .put('/users/' + userID)
      .send({'teamColor':'green'})
      .end(function(err, res){
        console.log(res.text);
        res.text.should.equal("You can't change your team");
        res.should.have.status(400);
        done();
      });
  });

    it('should not update a SINGLE user on /user/<id> PUT try change name, email and password', function(done) {
    chai.request(server)
      .put('/users/' + userID)
      .send({'name': 'ChangementError', 'email':'changement@hotmail.com', 'password':'11111'})
      .end(function(err, res){
        console.log(res.text);
        res.text.should.equal("Can't change email");
        res.should.have.status(400);
        done();
      });
  });


/*/USER POST ERREURS*/
it('should not CREATE user on /user post email already exist', function(done) {
		chai.request(server)
    	.post('/users')
    	.send({'name': 'Copie','email':'creation@hotmail.com','password':'12345', 'teamColor':'red'})
    	.end(function(err, res){
        console.log(res.headers);
    		res.should.have.status(400);
        res.text.should.equal('Email already exist');
    		done();
    	});
	});



 /* /USERS DELETE OK */
  it('should delete a SINGLE USER on /user/<id> DELETE', function(done) {
    chai.request(server)
      .delete('/users/'+userID)
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(204);
        done();
      });
  });

   /* /USERS DELETE ERROR */
  it('should not delete a SINGLE USER on /user/<id> DELETE not find USER bad id', function(done) {
    chai.request(server)
      .delete('/users/58fc17864a5d632db8a23129')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
  });

  /*/USER POST ERREURS*/
  it('should not CREATE user on /user post miss email,password', function(done) {
    chai.request(server)
      .post('/users')
      .send({'name': 'erreur', 'teamColor':'red'})
      .end(function(err, res){
        //console.log(err.response.res.text);
        res.should.have.status(400);
        res.text.should.equal('need a email'); 
        done();
      })
  });

  it('should not CREATE user on /user post miss name,password', function(done) {
    chai.request(server)
      .post('/users')
      .send({'email':'erreur@hotmail.com','teamColor':'red'})
      .end(function(err, res){
        //console.log(err.response.res.text);
        res.should.have.status(400);
        res.text.should.equal('need a name'); 
        done();
      });
  });

  it('should not CREATE user on /user post miss name,email', function(done) {
    chai.request(server)
      .post('/users')
      .send({'password':'12345','teamColor':'red'})
      .end(function(err, res){
        //console.log(err.response.res.text);
        res.should.have.status(400);
        res.text.should.equal('need a name'); 
        done();
      });
    });

  it('should not CREATE user on /user post miss name', function(done) {
    chai.request(server)
      .post('/users')
      .send({'email':'erreur@hotmail.com','password':'12345','teamColor':'red'})
      .end(function(err, res){
        //console.log(err.response.res.text);
        res.should.have.status(400);
        res.text.should.equal('need a name'); 
        done();
      });
  });

   it('should not CREATE user on /user post miss email', function(done) {
    chai.request(server)
      .post('/users')
      .send({'name': 'error','password':'12345','teamColor':'red'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a email'); 
        done();
      });
  });

  it('should not CREATE user on /user post miss password', function(done) {
    chai.request(server)
      .post('/users')
      .send({'name': 'error','email':'error@hotmail.com','teamColor':'red'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a Password'); 
        done();
      });
  });

  it('should not CREATE user on /user post miss teamColor', function(done) {
    chai.request(server)
      .post('/users')
      .send({'name': 'error','email':'error@hotmail.com','password':'12345'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a Team color'); 
        done();
      });
  });

  it('should not CREATE user on /user post miss password and teamColor', function(done) {
    chai.request(server)
      .post('/users')
      .send({'name': 'error','email':'error@hotmail.com'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a Password'); 
        done();
      });
  });

  it('should not CREATE user on /user post miss email and teamColor', function(done) {
    chai.request(server)
      .post('/users')
      .send({'name': 'error','password':'12345'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a email'); 
        done();
      });
  });

  it('should not CREATE user on /user post miss name and TeamColor', function(done) {
    chai.request(server)
      .post('/users')
      .send({'email':'error@hotmail.com','password':'12345'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a name'); 
        done();
      });
  });

  it('should not CREATE user on /user post miss everythings', function(done) {
    chai.request(server)
      .post('/users')
      .send({})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a name'); 
        done();
      });
  });

    it('should not CREATE user on /user post miss name password and email', function(done) {
    chai.request(server)
      .post('/users')
      .send({'teamColor':'blue'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('need a name'); 
        done();
      });
  });

  it('should not CREATE user on /user post bad teamColor', function(done) {
    chai.request(server)
      .post('/users')
      .send({'name': 'error','email':'error@hotmail.com','password':'12345','teamColor':'error'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('Team color is not correct'); 
        done();
      });
  });
});



