// TreeService.js

var TreeDAO = require('./TreeDAO');
var UserService = require('../user/UserService');
var TeamService = require('../team/teamService');
var ParcService = require('../parc/ParcService');

module.exports = {

    servicetakeControleOfAtree: function(idUser, idTree, callback) {
        //trouve le tree du param
        TreeDAO.findOneTree(idTree, function(err, tree) {
            if (err == 'noTree') {
                return callback('noTree');

            } else if (err) {
                callback('error server when find tree');
            } else {
                var idusertree = tree.userIdControl;
                //trouve le user avec le id du body
                UserService.serviceFindOneUser(idUser, function(err, user) {
                    if (err) return callback('error server when find user');
                    else if (user == null) {
                        return callback('NoUser');
                    }
                    //peut t'il le controler? si même couleur, non..
                    else if (user.teamColor != tree.teamColor) {
                        //L'arbre a t-il un parc?
                        ParcService.servicefindParcsWithTreeName(tree.parc, function(err, parc) {
                            if (err) return callback("error when finding the parc")
                                //si il a un parc
                            if (parc == null) {
                                parc = false;
                            }

                            if (parc) {
                                UserService.serviceFindOneUser(idUser, function(err, user1) {

                                    UserService.serviceFindOneUser(idusertree, function(err, user2) {

                                        ParcService.serviceUpdateParcWhenTreeControle(user1, user2, parc, function(err, parc) {
                                            if (err) return callback(err)
                                        });
                                    });
                                });
                            }
                        });

                        //retire 5 pts à l'user qui controlait l'arbre
                        UserService.serviceUpdateScoreUser(idusertree, -5, function(err, user) {
                            if (err) callback('error server when update score user 2');
                            //Ajout 5pts à l'équipe joueur 2;
                            TeamService.serviceUpdateScoreTeam(user.teamColor, -5, function(err, team) {
                                if (err) callback('error update score team user 1')
                            });
                        });

                        //ajout 5pts à user1
                        UserService.serviceUpdateScoreUser(user._id, 5, function(err, user) {
                            if (err) return callback('error server when update score user 1');
                            //Ajout 5pts à l'équipe joueur 1;
                            TeamService.serviceUpdateScoreTeam(user.teamColor, 5, function(err, team) {
                                if (err) return callback('error update score team user 1')
                            });
                        });

                        TreeDAO.updateTreeWhenNewControler(tree, user, function(tree) {
                            callback("", tree);
                        });
                    } else {
                        callback("cannot controle a tree you already controle", tree);
                    }
                });
            }

        });
    },

    serviceReturnAllTrees: function(req, callback) {
        TreeDAO.findAllTrees(req, callback);
    },

    servisefindOneTree: function(idTree, callback) {
        TreeDAO.findOneTree(idTree, callback);
    },

    serviceFindMostPopularTree : function(callback)
    {
        TreeDAO.findMostPopularTree(callback);
    }
};