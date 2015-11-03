var responseHelpers = require('./../Helpers/responseHelper.js'),
	express = require('express');
	router = express.Router();
	Model = require('./../models/db.js');
	Car = Model.Car,
	authentication = require('./../Helpers/AuthenticationHelper.js').authentication;
	authorization = require('./../Helpers/AuthenticationHelper.js').authorization;
	exports.version = "1.0.0";
/* 
* @brief
*  funcion que se encarga de crear un carro.
* @param [authentication] Se encarga de validar que el token suministrado sea valido.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.post('/',authentication,function (req,res){
	console.log(res.userName );
		Car.create({ UserUserName:  res.userName,
				ManufacturerId: req.body.manufacturerId,
				ModelId:        req.body.modelId,
				ColorId:        req.body.colorId,
		 	    transmision:    req.body.transmision ,
		 	    combustible:    req.body.combustible, 
		 	    km:             req.body.km,
		 	    year:           req.body.year, 
		 	    price:          req.body.price})		
	.then(function(c){
		responseHelpers.sendResponse(res,200,null,req.body);
	}).catch(function(err){
		responseHelpers.sendResponse(res,400,{message: err.message},null);	
	});

});
/* 
* @brief
*  funcion que se encarga de eliminar un carro por el id.
* @param [res] Respuesta del servidor.
* @param [authentication] Se encarga de validar que el token suministrado sea valido.
* @param [req] Peticion del cliente.
*/
router.delete('/:carid',authentication,function (req,res){
	Car.findById(parseInt(req.param("carid")))
	.then(function(c){
		if ( c == null)
			responseHelpers.sendResponse(res,400,{message: "No existen carros con este id."},null);
	   c.destroy();
	   responseHelpers.sendResponse(res,200,{message: "Registro Borrado!"},null);
	})
	.catch(function(err){	
		responseHelpers.sendResponse(res,400,{message: err.message},null);
});

});
/* 
* @brief
*  funcion que se encarga de actualizar un carro.
* @param [res] Respuesta del servidor.
* @param [authentication] Se encarga de validar que el token suministrado sea valido.
* @param [req] Peticion del cliente.
*/
router.put('/',authentication,function (req,res){
	Car.findOne({where: { id: req.body.id} })
		.then(function (c) {
		if (c == null )
			responseHelpers.sendResponse(res,400,{message: "No existen carros con este id."},null);
			c.updateAttributes({
				ColorId : req.body.colorId,
				ModelId : req.body.modelId,
				UserUserName :  res.userName,
				precio : req.body.precio,
				km : req.body.km,
				year : req.body.year,
				combustible : req.body.combustible,
				transmision : req.body.transmision,
				ManufacturerId: req.body.ManufacturerId
			}).then(function(c){
				responseHelpers.sendResponse(res,200,null,c);
			})
			.catch(function (err){
				responseHelpers.sendResponse(res,400,{message: err.message},null);
			});
		
		
	})
	.catch(function (err){
		responseHelpers.sendResponse(res,400,{message: err.message},null);
	});
});
/* 
* @brief
*  funcino que se encarga de consultar carros.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.get('/',function (req,res){
	var params = {
		ColorId : req.query.colorId == undefined ? undefined: req.query.colorId,
		ModelId : req.query.modelId == undefined ? "" : req.query.modelId,
		UserUsername : req.query.userName == undefined ? "": req.query.userName,
		Price : req.query.price  == undefined ?  "":req.query.price,
		km : req.query.km  == undefined ? "": req.query.km,
		year : req.query.year  == undefined ? "": req.query.year,
		combustible : req.query.combustible   == undefined ? "" : req.query.combustible,
		transmision : req.query.transmision == undefined ? "": req.query.transmision,
		ManufacturerId: req.query.ManufacturerId == undefined ? "": req.query.ManufacturerId
		};
		  for (var key in params){
		  	if ( params.hasOwnProperty(key) && 
		  	     (params[key] == undefined || params[key] == '')
		  		)
		  		delete params[key];
		  }
		var page = req.query.page == undefined ? 1 : req.query.page;
		var pageSize = req.query.offset == undefined ? 50 : req.query.offset; 
		page = page < 0 ? 1:page;
		pageSize = pageSize < 0 ? 50 : pageSize;
 	Car.findAll( { where: params, offset: (page-1)*pageSize, limit: pageSize})
 	.then(function(collection){
			responseHelpers.sendResponse(res,200,null,collection);
 	})
 	.catch(function(err){
 		responseHelpers.sendResponse(res,400,{message:err.message},null);
 	});
		
});
module.exports = router;