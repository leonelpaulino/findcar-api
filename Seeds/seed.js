var model = require('../models/db.js');	
var Users = model.User;
var Colors = model.Color
var Models = model.Model;		
var Manufacturers = model.Manufacturer;
var Cars = model.Car;
var Images = model.Image;
var async = require('async');
async.waterfall([function(callback){
	console.log('1');
	Users.create({userName: 'lpaulino',password: '123123',email: 'leonelpaulino18@gmail.com',isAdmin : true})
	.then(function(a){
		Users.create({userName: 'lruiz',password: '123123',email: 'luimiruiz@gmail.com',isAdmin : true})
		.then(function(b){
			Users.create({userName: 'gwu',password: '123123',email: 'gilvenwu@gmail.com',isAdmin : true})
			.then(function(c){
				callback(null,c);
			});
		});
	});
},function(val,callback){
	console.log('2');
	Colors.create({name:'Azul'})
	.then(function(a){
		Colors.create({name:'Verde'})
		.then(function(b){
			Colors.create({name:'Rojo'})
			.then(function(c){
				Colors.create({name:'Negro'})
				.then(function(d){
					Colors.create({name:'Blanco'})
					.then(function(e){
						Colors.create({name:'Gris'})
						.then(function(f){
							callback(null,f)
						});
					});
				});
					
			});		
		});	
	});
},function(val,callback){
	Manufacturers.create({name:'Honda'})
	.then(function(a){
		Manufacturers.create({name:'Toyota'})
		.then(function(b){
			Manufacturers.create({name:'BMW'})
			.then(function(c){
				callback(null,c);	
			});		
		});	
	});
},function(val,callback){
	Models.create({name:'Civic',ManufacturerId:1})
	.then(function(a){
		Models.create({name:'Acoord',ManufacturerId:1})
		.then(function(b){
			Models.create({name:'Camry',ManufacturerId:2})
			.then(function(c){
				Models.create({name:'Corolla',ManufacturerId:2})
				.then(function(d){
					Models.create({name:'M-6',ManufacturerId:3})
					.then(function(e){
						Models.create({name:'M-8',ManufacturerId:3})
						.then(function(f){
							callback(null,f)
						});
					});
				});
					
			});		
		});	
	});
},function(val,callback){
	Cars.create({ManufacturerId:1 , ModelId:1 ,  ColorId:1, transmision:"Tracción Trasera",
				   combustible: "Gasolina" , km:"1233" , year:"2011",price:40000,UserUserName:'lruiz'})
	.then(function(a){
		Cars.create({ManufacturerId:1 , ModelId:2 ,  ColorId:2, transmision:"Tracción Trasera",
					   combustible: "Gasolina" , km:"32" , year:"2009",price:123123,UserUserName:'lruiz'})
		.then(function(b){
			Cars.create({ManufacturerId:2 , ModelId:3 ,  ColorId:3, transmision:"Tracción Trasera",
								combustible: "Gasolina" , km:"3332" , year:"2008",price:40123000,UserUserName:'lpaulino'})
			.then(function(c){
				Cars.create({ManufacturerId:2 , ModelId:4 ,  ColorId:4, transmision:"Tracción Trasera",
							   combustible: "Gasolina" , km:"1233321" , year:"2013",price:400,UserUserName:'lpaulino'})
				.then(function(d){
					Cars.create({ManufacturerId:3 , ModelId:5 ,  ColorId:5, transmision:"Tracción Trasera",
								  combustible: "Gasolina" , km:"0" , year:"2015",price:423230000,UserUserName:'gwu'})
					.then(function(e){
						Cars.create({ManufacturerId:3 , ModelId:6 ,  ColorId:6, transmision:"Tracción Trasera",
										combustible: "Gasolina" , km:"1232" , year:"2000",price:40,UserUserName:'gwu'})
						.then(function(f){
							callback(null,f)
						});
					});
				});
					
			});		
		});	
	});
},function(val,callback){
	Images.create({imagepath:'./cars/1.jpg',CarId:1});
	Images.create({imagepath:'./cars/2.jpg',CarId:2});
	Images.create({imagepath:'./cars/3.jpg',CarId:3});
	Images.create({imagepath:'./cars/4.jpg',CarId:4});
	Images.create({imagepath:'./cars/5.jpg',CarId:5});
	Images.create({imagepath:'./cars/6.jpg',CarId:6});
}]);