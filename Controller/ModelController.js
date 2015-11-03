var responseHelpers = require('./../Helpers/responseHelper.js'),
	express = require('express');
	router = express.Router();
	models = require('./../models/db.js'),
	Model = models.Model,
	authentication = require('./../Helpers/AuthenticationHelper.js').authentication;
	authorization = require('./../Helpers/AuthenticationHelper.js').authorization;
	exports.version = "1.0.0";
/* 
* @brief
*  funcion que se encarga de crear un modelo.
* @param [authentication] Se encarga de validar que el token suministrado sea valido.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.post('/',authentication,authorization,function (req,res){
	Model.create({name:req.body.name, ManufacturerId: req.body.manufacturerId})
	.then(function(m){
		responseHelpers.sendResponse(res,200,null,m);
	})
	.catch(function(err){
		responseHelpers.sendResponse(res,400,{message:err},null);
	});
});

/* 
* @brief
*  funcion que se encarga de borrar un modelo.
* @param [authentication] Se encarga de validar que el token suministrado sea valido.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.delete('/:modelId',authentication,authorization,function (req,res){
	Model.findById(parseInt(req.param('modelId')))
	.then(function(m){
		if ( m == null)
			responseHelpers.sendResponse(res,400,{message: "No existen modelos con este id."},null);
		m.destroy();
		responseHelpers.sendResponse(res,200,{message: "Registro Borrado!"},null);
	})
	.catch(function(err){
		responseHelpers.sendResponse(res,400,{message: err.message},null);
	});
});
/* 
* @brief
*  funcion que se encarga de actualizar un modelo.
* @param [authentication] Se encarga de validar que el token suministrado sea valido.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.put('/',authentication,authorization,function (req,res){
	Model.findById(req.body.id)
	.then(function (m){
		if (m == null)
			responseHelpers.sendResponse(res,400,{message: "No existen modelos con este id."},null);
		m.updateAttributes({
			name : req.body.name,
			manufacturerId: req.body.manufacturerId
		})
		.then(function(m){
			responseHelpers.sendResponse(res,200,null,m);
		})
		.catch(function (err){
			responseHelpers.sendResponse(res,400,{message: err.message},null);
		});
	})
	.catch(function (err) {
		responseHelpers.sendResponse(res,400,{message: err.message},null);
	})
});
/* 
* @brief
*  funcion que se encarga de consultar modelos.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.get('/',function (req,res){
	var params = {
		id: req.query.id,	
		manufacturerId: req.query.manufacturerId
	}	
    for (var key in params){
	  	if ( params.hasOwnProperty(key) && 
	  	     (params[key] == undefined || params[key] == '')
	  		)
  			delete params[key];
	  }
    var page = req.query.page;
	var pageSize =  req.query.offset; 
	if (page && pageSize){
	page = page < 0 ? 1:page;
	pageSize = pageSize < 0 ? 50 : pageSize;
	}
	else {
		page = undefined;
		pageSize = undefined;
	}
	Model.findAll({where:params, offset:(page-1)*pageSize,limit:pageSize})
	.then(function(collection){
		responseHelpers.sendResponse(res,200,null,collection);
		})
		.catch(function(err){
			responseHelpers.sendResponse(res,400,{message:err.message},null);
		});
});

module.exports = router;