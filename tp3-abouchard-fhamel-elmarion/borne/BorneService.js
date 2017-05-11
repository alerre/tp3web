// BorneService.js

var BorneDAO = require('./BorneDAO'); 
var UserService = require('../user/UserService');
var TeamService = require('../team/teamService');

module.exports = {

    servicetakeControleOfABorne : function(idUser, idBorne, callback)
    {
        //trouve le borne du param
        BorneDAO.findOneBorne(idBorne, function(err, borne){
            if(err == "noborne") 
            {   
                return callback('noborne');
            }
            else if(!borne)
            { 
                callback('error server when find borne');

            }
            else
            {  
                var iduserborne = borne.userIdControl;
                //trouve le user avec le id du body
                UserService.serviceFindOneUser(idUser,function(err, user){
                    if(err) return callback('error server when find user');
                    else if(user == null)
                    {   
                        return callback('NoUser');
                    }
                    //peut t'il le controler? si même couleur, non..
                    else if(user.teamColor != borne.teamColor)
                    {
                        //retire 5 pts à l'user qui controlait l'arbre
                        UserService.serviceUpdateScoreUser(iduserborne   , -5, function(err, user){
                            if(err) callback('error server when update score user 2');
                            //Ajout 5pts à l'équipe joueur 2;
                            TeamService.serviceUpdateScoreTeam(user.teamColor, -5, function(err, team){
                                if(err) callback('error update score team user 1')
                            });
                        });

                        //ajout 5pts à user1
                        UserService.serviceUpdateScoreUser(user._id, 5, function(err, user){
                        
                        if(err) return callback('error server when update score user 1');
                            //Ajout 5pts à l'équipe joueur 1;
                            TeamService.serviceUpdateScoreTeam(user.teamColor, 5, function(err, team){
                                if(err) return callback('error update score team user 1')           
                            });
                        });
                        
                        BorneDAO.updateBorneWhenNewControler(borne, user, function(borne)
                        {       
                                callback("",borne);
                        });
                    }
                    else
                    {
                        callback("cannot controle a borne you already controle",borne);
                    }
                });
            }
            
        });
    },

    serviceReturnAllBorne : function(req, callback)
    {
        BorneDAO.findAllBornes(req, callback);
    },

    servisefindOneBorne: function(idborne, callback)
    {
        BorneDAO.findOneBorne(idborne, callback);
    },

    serviceFindMostPopularBorne : function(callback)
    {
        BorneDAO.findMostPopularBorne(callback);
    }
};


