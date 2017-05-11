var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);

/********************************************/
/********************************************/
/*******************PARCS*******************/
/********************************************/
/********************************************/

describe('parcs', function() {


  it('should get all parcs in the a scare /parcs', function(done) {
      var bOk = false;
      chai.request(server)
      .get('/parcs/46.795/46.796431/-71.3/-71.25658')
      //.set('Authorisation',token)
      .end(function(err, res){

        for(var i in res.body)
        {
            var parc = res.body[i];
            for(var j in parc.coordinates)
            {
                var coordo = parc.coordinates[j];

                if((coordo.lat >= 46.795) 
                && (coordo.lat <= 46.796431) 
                && (coordo.lng >= -71.3) 
                && (coordo.lng <= -71.25658))
                {
                    bOk = true;
                }
            }
            bOk.should.equal(true);
            bOk= false;
        }
        res.should.have.status(200);
        done();
    });

  });

  
});