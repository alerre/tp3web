var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

/********************************************/
/********************************************/
/********************TREES*******************/
/********************************************/
/********************************************/
describe('tree', function() {

 var user;
 var _this = this;

  it('should list ALL tree on /trees/minlat/maxlat/minlong/maxlong GET', function(done) {
      chai.request(server)
      .get('/trees/46.806542/46.806544/-71.3393/-71.3391')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.body[0]._id.should.equal("58fb90833afac41e8c6bf6b8");
        res.body[0].estMalade.should.equal(false);
        res.should.have.status(200);
        done();
      });
  });

  it('should not update ONE tree on /trees/id put miss userId', function(done) {
      chai.request(server)
      .put('/trees/58fb90833afac41e8c6bf6b8')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(401);
        res.text.should.equal("Need authentification");
        done();
      });
  });

  it('should not update ONE tree on /trees/id put user already controle the tree', function(done) {
      chai.request(server)
      .put('/trees/58fb90833afac41e8c6bf6b9')
      //.set('Authorisation',token)
      .send({'userid':'58feb509734d1d6c1a2c50c8'})
      .end(function(err, res){
        res.should.have.status(400);
        res.text.should.equal('cannot controle a tree you already controle');
        done();
      });
  });

  it('should not update ONE tree on /trees/id put tree dont exist', function(done) {
      chai.request(server)
      .put('/trees/58fb90933afac41e8c6bf6b9')
      //.set('Authorisation',token)
      .send({'userid':'58fab8ad2d924328d84490bc'})
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('Cannot find the tree');
        done();
      });
  });

  it('should not update ONE tree on /trees/id put user dont exist', function(done) {
      chai.request(server)
      .put('/trees/58fb90833afac41e8c6bf6b9')
      //.set('Authorisation',token)
      .send({'userid':'58fab8ad2d924328d84490bc'})
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('Cannot find the user');
        done();
      });
  });



  it('should not return ONE tree on /trees/id get id invalid', function(done) {
      chai.request(server)
      .get('/trees/58fb90833afc41e8c6bf6b9')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('Tree not found');
        done();
      });
  });

 it('should return ONE tree on /trees/id get', function(done) {
      chai.request(server)
      .get('/trees/58fb90833afac41e8c6bf6b9')
      //.set('Authorisation',token)
      .end(function(err, res){
        res.body._id.should.equal("58fb90833afac41e8c6bf6b9")
        res.body.teamColor.should.equal("red");
        res.should.have.status(200);
        done();
      });
  });



  it('should update ONE tree on /trees/id put green team', function(done) {
   
    _this.timeout(2000);

    chai.request(server)
      .get('/users/58ff6bcf734d1d6c1a2c9936')
      //.set('Authorisation',token)
      .end(function(err, res){
        user = res.body;
        res.body.name.should.equal("sir gardacane");
        res.should.have.status(200);
    });

    chai.request(server)
      .put('/trees/58fb90833afac41e8c6bf6b9')
      //.set('Authorisation',token)
      .send({'userid':'58ff6bcf734d1d6c1a2c9936'})
      .end(function(err, res){
        res.body.userIdControl.should.equal(user._id);
        res.body.teamColor.should.equal(user.teamColor);
        res.should.have.status(200);
    });
    
    setTimeout(done,1900)
  });
  
  it('should update ONE tree on /trees/id put red team', function(done) {
    chai.request(server)
    .put('/trees/58fb90833afac41e8c6bf6b9')
    //.set('Authorisation',token)
    .send({'userid':'58feb509734d1d6c1a2c50c8'})
    .end(function(err, res){
      res.should.have.status(200);

    });

    _this.timeout(2000);
    setTimeout(done,1900)

  });

});

