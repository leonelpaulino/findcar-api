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

exports.getImage = function (id,callback){
	var params = {
		CarId: id
	}
	console.log(params);
	Images.findAll({Where: {CarId:3}}).then(function(collection){
		console.log(collection);
		async.forEachSeries(collection,function(value,callback1){
			value.dataValues.base64Image = fs.readFileSync(value.dataValues.imagepath).toString('base64');
			callback1();
		},function(err){
			if (err) 
				callback(err,null);
			else 
				callback(null,collection);
		});
	});	
}
exports.addImage = function (base64,id){
	var decoded = new Buffer(base64,'base64');
		var imagepath = 'cars/'+Guid.raw()+'.jpg'
		fs.writeFile(imagepath,decoded,'binary',function(err){
			if ( err) throw err;
			Images.create({
				imagepath: imagepath,
				CarId : id
			});
		});
}
exports.returnCars = function(collection,call){
	async.forEachSeries(collection,function(value,callback){
			async.waterfall([function(callback2){
				Models.findById(value.dataValues.ModelId).then(function(model){
					callback2(null,model);
				});
			},function(model,callback2){
				value.dataValues.Model = model.dataValues;
				Color.findById(value.dataValues.ColorId).then(function(color){
					callback2(null,color);
				});
			},function(color,callback2){
				value.dataValues.Color = color.dataValues;
				Manufacturer.findById(value.dataValues.ManufacturerId).then(function(manufacturer){
					callback2(null,manufacturer);
				});

			},function(manufacturer,callback2){
				value.dataValues.Manufacturer = manufacturer;
				carHelper.getImage(value.dataValues.id,function(err,images){
					callback2(null,images);
				});
			},function(images,callback2){
				value.dataValues.images = images;
				callback();
			}]);
	},function(err){
		if ( err == null)
			call(null,collection);	
		else 
			call(err,null);
	});	
}
exports.deleteImages = function(id){
	findById(id).then(function(image){
		fs.unlinkSync(image.dataValues.imagepath);
	});
}