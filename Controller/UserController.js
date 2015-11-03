var responseHelpers = require('./../Helpers/responseHelper.js'),
	express = require('express');
	router = express.Router();
	Model = require('./../models/db.js');
	User = Model.User;
	Token = Model.Token,
	secretKey = require('./../config.js').secret,
 	jsonwebtoken = require('jsonwebtoken'),
	exports.version = "1.0.0";
	authentication = require('./../Helpers/AuthenticationHelper.js').authentication;
	authorization = require('./../Helpers/AuthenticationHelper.js').authorization;

/* 
* @brief
*  funcion que se encarga de realizar el login 
* @param [username] usuario.
* @param [password] contraseña.	
* @param [req] peticion del cliente.
* @param [res] respuesta del servidor.
*/

router.post('/login', function (req,res) {
	User.findOne({ where: {
	userName: req.body.userName	}	
	})
	.then(function(u){
		if (u == null){
			responseHelpers.sendResponse(res,400,{message:"Autenticación fallida. Usuario no encontrado."},null);
		}
		else {
			if ( User.verifyPassword(req.body.password,u.password)) {
				var token = jsonwebtoken.sign({userName:req.body.userName},secretKey,{
					 expiresInMinutes: 10
				});
				responseHelpers.sendResponse(res,200,null,{token:token});
			}
			else {
				responseHelpers.sendResponse(res,400,{message:"Autenticación fallida. Contraseña no es valida."},null);
			}
		}		
	});
});
/* 
* @brief
*  funcion que se encarga de realizar el logout 
* @param [req] peticion del cliente.
* @param [res] respuesta del servidor.
*/
router.get('/logout',authentication,function (req,res){
	Token.create({token:req.param('token') || req.headers['x-access-token']})
	.then(function(t){
		responseHelpers.sendResponse(res,200,{message:"Adios!."},null);
	});
});
/* 
* @brief
*  funcion de crear un usuario en la base de datos 
* @param [user] usuario.
* @param [req] peticion del cliente.
* @param [res] respuesta del servidor.
*/
router.post('/', function (req,res){
	    User.findOne({where:{email:req.body.email}}).then(function(u){
	    	if (u != null ){ 
	    		responseHelpers.sendResponse(res,400,{message: "Ya este correo esta en uso."},null);
	    		return;
	    	}
			User.create({userName: req.body.userName , password: req.body.password , email: req.body.email,isAdmin:0})
			.then(function(u){
				responseHelpers.sendResponse(res,200,null,{userName:u.userName, email: u.email});
			}).catch(function(error){
				responseHelpers.sendResponse(res,400,{message: error.message},null);	
			});
		}).catch(function(error){
			responseHelpers.sendResponse(res,400,{message: error.message},null);	
		});
});
/* 
* @brief
*  funcion de crear un usuario en la base de datos 
*  como administrador.
* @param [user] usuario.
* @param [req] peticion del cliente.
* @param [res] respuesta del servidor.
*/
router.post('/createAdmin',authentication,authorization,function (req,res){
	    User.findOne({where:{email:req.body.email}}).then(function(u){
	    	if (u != null ){ 
	    		responseHelpers.sendResponse(res,400,{message: "Ya este correo esta en uso."},null);
	    		return;
	    	}
			User.create({userName: req.body.userName , password: req.body.password , email: req.body.email,isAdmin:req.body.isAdmin})
			.then(function(u){
				responseHelpers.sendResponse(res,200,null,{userName:u.userName, email: u.email});
			}).catch(function(error){
				responseHelpers.sendResponse(res,400,{message: error.message},null);	
			});
		}).catch(function(error){
			responseHelpers.sendResponse(res,400,{message: error.message},null);	
		});
});
module.exports = router;