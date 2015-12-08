var responseHelpers = require('./../Helpers/responseHelper.js'),
	express = require('express'),
	router = express.Router(),
	Model = require('./../models/db.js');
	Car = Model.Car,
	Models = Model.Model,
	Manufacturer = Model.Manufacturer,
	Color = Model.Color,
	authentication = require('./../Helpers/AuthenticationHelper.js').authentication,
	authorization = require('./../Helpers/AuthenticationHelper.js').authorization,
	carHelper = require('./../Helpers/CarHelper.js');
	multipart  = require('connect-multiparty');
	var multipartMiddleware = multipart();
	exports.version = "1.0.0";
/* 
* @brief
*  funcion que se encarga de crear un carro.
* @param [authentication] Se encarga de validar que el token suministrado sea valido.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.post('/',authentication,multipartMiddleware,function (req,res){ 
			Car.create({
				UserUserName:  res.userName,
				ManufacturerId: req.body.manufacturerId,
				ModelId:        req.body.modelId,
				ColorId:        req.body.colorId,
		 	    transmision:    req.body.transmision ,
		 	    combustible:    req.body.combustible, 
		 	    km:             req.body.km,
		 	    year:           req.body.year, 
		 	    price:          req.body.price}
			)		
		.then(function(c){
			async.forEachSeries(req.files,function(value,callback){
				console.log(value.path);
				carHelper.addImage(value.path,c.id,function(){
					callback();		
				});
				
			},function(err){
				if (err)
				 responseHelpers.sendResponse(res,400,{message:err.message},null);	
				else {
					carHelper.returnCar(c,function(err,result){
					 	if (err == null) 
 							responseHelpers.sendResponse(res,200,null,result);		
						else 
 							responseHelpers.sendResponse(res,400,{message:err.message},null);	
	 				});
				}
			});
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
		carHelper.deleteImages(c.dataValues.id,function(err){
			if (err)
				responseHelpers.sendResponse(res,400,{message: err.message},null);
			c.destroy();	
			responseHelpers.sendResponse(res,200,{message: "El Registro fue borrado!"},null);

		});	
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
router.put('/',authentication,multipartMiddleware,function (req,res){
	console.log("Entro!");
	Car.findOne({where: { id: req.body.id} })
		.then(function (c) {
			if (c == null ){
				responseHelpers.sendResponse(res,400,{message: "No existen carros con este id."},null);
			}
			console.log(req.files);
			carHelper.updateImage(req.files,c.id,function(){
				c.updateAttributes({
					ColorId : req.body.colorId,
					ModelId : req.body.modelId,
					UserUserName :  res.userName,
					price : req.body.price,
					km : req.body.km,
					year : req.body.year,
					combustible : req.body.combustible,
					transmision : req.body.transmision,
					ManufacturerId: req.body.ManufacturerId
				})
				.then(function(val){
					carHelper.returnCar(val,function(err,result){
	 					if (err == null) 
	 						responseHelpers.sendResponse(res,200,null,result);		
	 					else 
	 						responseHelpers.sendResponse(res,400,{message:err.message},null);	
	 				});
				})
			    .catch(function (err){
						responseHelpers.sendResponse(res,400,{message: err.message},null);
		    	});
		
			});
		})	
	.catch(function (err){
		responseHelpers.sendResponse(res,400,{message: err.message},null);
	});
});
/* 
* @brief
*  funcion que se encarga de consultar carros.
* @param [res] Respuesta del servidor.
* @param [req] Peticion del cliente.
*/
router.get('/',function (req,res){
	var page = req.query.page == undefined ? 1 : req.query.page;
	var pageSize = req.query.offset == undefined ? 50 : req.query.offset; 
	page = page < 0 ? 1:page;
	pageSize = pageSize < 0 ? 50 : pageSize;
			var params = {
				id: req.query.id == undefined? undefined:req.query.id,
				ColorId : req.query.colorId == undefined ? undefined: req.query.colorId,
				ModelId : req.query.modelId == undefined ? "" : req.query.modelId,
				UserUsername : req.query.userName == undefined ? "": req.query.userName,
				combustible : req.query.combustible   == undefined ? "" : req.query.combustible,
				transmision : req.query.transmision == undefined ? "": req.query.transmision,
				ManufacturerId: req.query.ManufacturerId == undefined ? "": req.query.ManufacturerId
				};
				if (req.query.price1 != null && req.query.price2 != null)
					params.Price = {$gte:req.query.price1, $lte: req.query.price2};
				else if (req.query.price1 != null)
				 	params.Price = {$gte:req.query.price1};
				else if (req.query.price2 != null )
					params.Price = {$lte:req.query.price2};
				if (req.query.km1 != null && req.query.km2 != null)
					params.km = {$gte:req.query.km1, $lte: req.query.km2};
				else if (req.query.km1 != null)
				 	params.km = {$gte:req.query.km1};
				else if (req.query.km2 != null )
					params.km = {$lte:req.query.km2};
				if (req.query.year1 != null && req.query.year2 != null)
					params.year = {$gte:req.query.year1, $lte: req.query.year2};
				else if (req.query.year1 != null)
				 	params.year = {$gte:req.query.year1};
				else if (req.query.year2 != null)
					params.year = {$lte:req.query.year2};
				  for (var key in params){
				  	if ( params.hasOwnProperty(key) && 
				  	     (params[key] == undefined || params[key] == '')
				  		)
				  		delete params[key];
				  }
	  	Car.find({ where: params, offset: (page-1)*pageSize, limit: pageSize})
	 		.then(function(collection){
	 			carHelper.returnCars(collection,function(err,result){
	 				if (err == null) 
	 					responseHelpers.sendResponse(res,200,null,result);		
	 				else 
	 					responseHelpers.sendResponse(res,400,{message:err.message},null);	
	 			});
	 		})
	 		.catch(function(err){
	 			responseHelpers.sendResponse(res,400,{message:err.message},null);
	 		});	
});
module.exports = router;