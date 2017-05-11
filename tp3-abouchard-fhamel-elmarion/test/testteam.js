var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);


/********************************************/
/********************************************/
/*******************TEAMS*******************/
/********************************************/
/********************************************/

describe('team', function() {

  it('should list ALL team on /teams GET', function(done) {
      var bred = false;
      var bblue = false;
      var bgreen = false;
      var byellow = false;
      var bpurple = false;
    
      chai.request(server)
      .get('/teams')
      .end(function(err, res){
        for(var i in res.body)
        {


          var team = res.body[i];
            switch(team.color)
            {
                case "red":
                {
                    bred = true;
                    break;
                }
                case "blue":
                {
                    bblue = true;
                    break;
                }
                case "green":
                {
                    bgreen = true;
                    break;
                }
                case "yellow":
                {
                    byellow = true;
                    break;
                }
                case "purple":
                {
                    bpurple = true;
                    break;
                }
                default:
                {
                    console.log("NOOOO")
                }
            }
        }
        bred.should.equal(true);
        bblue.should.equal(true);
        bgreen.should.equal(true);
        byellow.should.equal(true);
        bpurple.should.equal(true);
        res.should.have.status(200);
        done();
      });
  });


  it('should return team red /teams GET', function(done) {
      chai.request(server)
      .get('/teams/red')
      .end(function(err, res){
        
        res.body.color.should.equal("red");
        res.should.have.status(200);
        done();
      });
  });

  it('should return team blue /teams GET', function(done) {
      chai.request(server)
      .get('/teams/blue')
      .end(function(err, res){
        
        res.body.color.should.equal("blue");
        res.should.have.status(200);
        done();
      });
  });

  it('should return team green /teams GET', function(done) {
      chai.request(server)
      .get('/teams/green')
      .end(function(err, res){
        
        res.body.color.should.equal("green");
        res.should.have.status(200);
        done();
      });
  });

  it('should return team yellow /teams GET', function(done) {
      chai.request(server)
      .get('/teams/yellow')
      .end(function(err, res){
        
        res.body.color.should.equal("yellow");
        res.should.have.status(200);
        done();
      });
  });

  it('should return team purple /teams GET', function(done) {
      chai.request(server)
      .get('/teams/purple')
      .end(function(err, res){
        
        res.body.color.should.equal("purple");
        res.should.have.status(200);
        done();
      });
  });


    it('should return error 404 /teams GET', function(done) {
      chai.request(server)
      .get('/teams/purpl')
      .end(function(err, res){
        res.should.have.status(404);
        res.text.should.equal('No team found');
        done();
      });
  });
});



