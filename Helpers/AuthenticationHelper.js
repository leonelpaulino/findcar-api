exports.version = "1.0.0";
	config = require('./../config.js');
	secretKey = config.secret;
 	jsonwebtoken = require('jsonwebtoken');
    model = require('./../models/db.js');
    tokens = model.Token;
    Users = model.User;
    responseHelpers = require('./responseHelper.js');
/* 
* @brief
*  Funcion que se encarga de verificar si un token es valido. si no es valido 
*  responde al cliente.
* @param [req] petición 
* @param [res] respuesta
* @param [next] callback que se encarga de llamar la proxima ruta.
*/
exports.authentication = function (req,res,next){
    var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
    if(token){
        jsonwebtoken.verify(token,secretKey,function(err, decoded){
            if (err){
                responseHelpers.sendResponse(res,401,{message:"Error de autenticación. El token no es valido"},null);
            }else{
                tokens.findById(token).then(function(t){
                    if (t != null){
                        responseHelpers.sendResponse(res,401,{message:"Error de autenticación. El token expiro"},null);
                    }
                    else {
                       res.userName = decoded.userName;
                       next();
                    }
                });
            }
        });
    } else {
        responseHelpers.sendResponse(res,401,{message:"Error de autenticacion. El token no fue suministrado"},null);
    }
}
/* 
* @brief
*  funcion que se encarga de validar si un usuario es administador o no. 
*  si no lo es responde al cliente.
* @param [req] petición 
* @param [res] respuesta
* @param [next] callback que se encarga de llamar la proxima ruta.
*/

exports.authorization = function(req,res,next){
    User.findOne({where:{userName:res.userName}}).then(function(u){
        if(u.isAdmin)
            next();
        else
            responseHelpers.sendResponse(res,401,{message:"Usted no tiene privilegios para entrar."},null);
    }).catch(function(err){
        responseHelpers.sendResponse(res,400,{message: err.message},null);
    })
}