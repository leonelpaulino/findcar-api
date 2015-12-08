exports.version = '1.0.0'; 
	fs = require('fs');
	Guid = require ('guid');
	Model = require('./../models/db.js');
	Car = Model.Car;
	Models = Model.Model;
	Manufacturer = Model.Manufacturer;
	Color = Model.Color;
	Images = Model.Image;
	async = require('async');

/* 
* @brief
*  funcion que se encarga de buscar todas las imagenes de un carro dado su  id
* @param [id] id del carro
* @param [callback] callback 
*/
exports.getImage = function (id,callback){
	Images.findAll({where:{CarId:id}}).then(function(collection){
			callback(null,collection)
	});

}
/* 
* @brief
*  funcion que se encarga de agregar una imagen nueva a un carro
* @param [base64] Imagen.
* @param [id] id del carro
* @param [callback] callback 
*/
exports.addImage = function (path,id,callback){
		fs.readFile(path,function(err,data){
			var imagepath = 'cars/'+Guid.raw()+'.jpg'	
			fs.writeFile(imagepath,data,function(err){
				Images.create({
					imagepath: imagepath,
					CarId : id
				})
				.then(function(c){
					if ( callback != null )
						callback();
				});
			});
		});
}
/* 
* @brief
*  funcion que se encarga de actualizar las imagenes de un carro.
* @param [ImageCollection] Imagenes.
* @param [id] id del carro
* @param [callback1] callback 
*/
exports.updateImage = function(imageCollection,id,callback1){
	exports.deleteImages(id, function(err){
		async.forEachSeries(imageCollection,function(value,callback){	
			exports.addImage(value.path,id,function() {
				callback();
			});
		},function(err){
			callback1();
		});
	});
}
/* 
* @brief
*  funcion que se encarga de retornar un objeto carro con todas sus relaciones (menos la de usuario)
* @param [c] el objeto Carro.
* @param [callback] callback 
*/
exports.returnCar = function (c,callback){
	async.waterfall([function(callback2){
		Models.findById(c.dataValues.ModelId).then(function(model){
			callback2(null,model);
		});
	},function(model,callback2){

		c.dataValues.Model = model.dataValues;
		Color.findById(c.dataValues.ColorId).then(function(color){
			callback2(null,color);
		});
	},function(color,callback2){

		c.dataValues.Color = color.dataValues;
		Manufacturer.findById(c.dataValues.ManufacturerId).then(function(manufacturer){

			callback2(null,manufacturer);
		});

	},function(manufacturer,callback2){
		c.dataValues.Manufacturer = manufacturer;
		exports.getImage(c.dataValues.id,function(err,images){
			
			callback2(null,images);
		});
	},function(images,callback2){
		c.dataValues.images = images;
		callback(null,c);
	}]);

}
/* 
* @brief
*  funcion que se encarga de retornar una lista de  objeto carro con todas sus relaciones (menos la de usuario)
* @param [collection] collection del objeto carro.
* @param [callback1] callback 
*/
exports.returnCars = function(collection,callback1){
	async.forEachSeries(collection,function(value,callback){
			exports.returnCar(value,function(c){
				value = c;
				callback();
			});
	},function(err){
		if ( err == null)
			callback1(null,collection);	
		else 
			callback1(err,null);
	});	
}
/* 
* @brief
*  funcion que se encarga de eliminar las imagenes de un carro
* @param [id] id del carro
* @param [callback] callback 
*/
exports.deleteImages= function(id,callback){
	Images.findAll({where:{CarId:id}}).then(function(collection){
		async.forEachSeries(collection,function(value,callback1){
			deleteImagesById(value.dataValues.imagepath);
			callback1();
		},function(err){
			if (err) 
				callback(err);
			else 
				callback(null);
		});
	});
}
/* 
* @brief
*  funcion que se encarga de eliminar una imagen dado su id.
* @param [c] el objeto Carro.
* @param [callback] callback 
*/
function deleteImagesById (id){
	Images.findById(id).then(function(image){
		console.log(image.dataValues.imagepath);
		fs.unlink(image.dataValues.imagepath);
		image.destroy();
	});
}
