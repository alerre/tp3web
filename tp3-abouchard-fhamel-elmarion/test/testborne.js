var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

/********************************************/
/********************************************/
/*******************BORNES*******************/
/********************************************/
/********************************************/

describe('borne', function() {

 var user;
 var _this = this;

  it('should list ALL borne on /bornes/minlat/maxlat/minlong/maxlong GET', function(done) {
      chai.request(server)
      .get('/bornes/46.867390/46.867392/-71.430486/-71.430484')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.body[0]._id.should.equal("58f8255c79a4f320503b736d");
        res.should.have.status(200);
        done();
      });
  });

  it('should not update ONE borne on /bornes/id put miss userId', function(done) {
      chai.request(server)
      .put('/bornes/58f8255c79a4f320503b736d')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(401);
        res.text.should.equal('Need user ID');
        done();
      });
  });

  

  it('should not update ONE borne on /bornes/id put user controle the borne', function(done) {
      chai.request(server)
      .put('/bornes/58f8255c79a4f320503b736d')
      //.set('Authorisation',token)
      .send({'userid':'58feb509734d1d6c1a2c50c8'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('cannot controle a borne you already controle');
        done();
      });
  });
  



  it('should not update ONE borne on /bornes/id put borne dont exist', function(done) {
      chai.request(server)
      .put('/bornes/58fb90933afac41e8c6bf6b9')
      //.set('Authorisation',token)
      .send({'userid':'58fab8ad2d924328d84490bc'})
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('Cannot find the borne');
        done();
      });
  });

  

  it('should not update ONE borne on /bornes/id put user dont exist', function(done) {
      chai.request(server)
      .put('/bornes/58f8255c79a4f320503b736d')
      //.set('Authorisation',token)
      .send({'userid':'58fab8ad2d924328d84490bc'})
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('Cannot find the user')
        done();
      });
  });
  

  it('should not return ONE borne on /bornes/id get id invalid', function(done) {
      chai.request(server)
      .get('/bornes/58f8255c79z4f320503b736d')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('borne not found');
        done();
      });
  });

 it('should return ONE borne on /bornes/id get', function(done) {
      chai.request(server)
      .get('/bornes/58f8255c79a4f320503b736d')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.body._id.should.equal("58f8255c79a4f320503b736d")
        res.body.teamColor.should.equal("red");
        res.should.have.status(200);
        done();
      });
  });

  it('should update ONE borne on /bornes/id put green team', function(done) {
   
    _this.timeout(2000);

    //get user 1
    chai.request(server)
      .get('/users/58ff6bcf734d1d6c1a2c9936')
      //.set('Authorisation',token)
      .end(function(err, res){
        user = res.body;
        res.body.name.should.equal("sir gardacane");
        res.should.have.status(200);
    });

    //update borne
    chai.request(server)
      .put('/bornes/58f8255c79a4f320503b736d')
      //.set('Authorisation',token)
      .send({'userid':'58ff6bcf734d1d6c1a2c9936'})
      .end(function(err, res){
        //res.body.userIdControl.should.equal(user._id);
        //res.body.teamColor.should.equal(user.teamColor);
        res.should.have.status(200);
    });
    
    setTimeout(done,1900)
  });

  it('should update ONE borne on /bornes/id put red team', function(done) {
    chai.request(server)
    .put('/bornes/58f8255c79a4f320503b736d')
    //.set('Authorisation',token)
    .send({'userid':'58feb509734d1d6c1a2c50c8'})
    .end(function(err, res){
      res.should.have.status(200);

    });

    _this.timeout(2000);
    setTimeout(done,1900)

  });

  it('should return the most popular borne on /bornes/popular/one get', function(done) {
    chai.request(server)
    .get('/bornes/popular/one')
    //.set('Authorisation',token)
    .end(function(err, res){
      res.should.have.status(200);
    });

    _this.timeout(2000);
    setTimeout(done,1900)

  });

});

