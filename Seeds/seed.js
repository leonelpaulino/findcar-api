var model = require('../models/db.js');	
var Users = model.User;
var Colors = model.Color
var Models = model.Model;		
var Manufacturers = model.Manufacturer;
var Cars = model.Car;
var Images = model.Image;
Users.create({userName: 'lpaulino',password: '123123',email: 'leonelpaulino18@gmail.com',isAdmin : true})
	.then(function (){
		Colors.create({name:'Azul'})
			.then(function (){
					Manufacturers.create({name:'Honda'})
						.then(function(){	
							Models.create({name: 'Civic',ManufacturerId:1})
								.then(function(){
									Cars.create({ManufacturerId:1 , ModelId:1 ,  ColorId:1, transmision:"Tracción Trasera",
												combustible: "Gasolina" , km:"12333" , year:"2010",price:400000, UserUserName:'lpaulino' }).then(function(c){
													Images.create({imagepath:'./cars/1.jpg',CarId:c.id});
												});
								});
							Models.create({name: 'Acoord',ManufacturerId:1})
								.then(function(){
									Colors.create({name: 'Rojo'})
										.then(function(){
											Cars.create({ManufacturerId:1 , ModelId:2 ,  ColorId:2, transmision:"Tracción Trasera",
														combustible: "Gasolina" , km:"1233" , year:"2000",price:500000,UserUserName:'lpaulino' }).then(function(c){
													Images.create({imagepath:'./cars/2.jpg',CarId:c.id});
													Images.create({imagepath:'./cars/4.jpg',CarId:c.id});
												});
										});
								});
						});
			});
  	});
Users.create({userName: 'lruiz',password: '123123',email: 'luimiruiz@gmail.com',isAdmin : true})
	.then(function(){
		Colors.create({name: 'Blanco'}).then(function(){
			Manufacturers.create({name:'Toyota'}).then(function(){
				Models.create({name: 'Camry',ManufacturerId:2}).then(function(){
					Cars.create({ManufacturerId:2 , ModelId:3 ,  ColorId:3, transmision:"Tracción Trasera",
								combustible: "Gasolina" , km:"123332" , year:"2009",price:40000,UserUserName:'lruiz'}).then(function(c){
													Images.create({imagepath:'./cars/3.jpg',CarId:c.id});
												});
				});
				Colors.create({name: 'Verde'}).then(function(){
					Models.create({name: 'Corolla',ManufacturerId:2}).then(function(){
						Cars.create({ManufacturerId:2 , ModelId:4 ,  ColorId:4, transmision:"Tracción Trasera",
									combustible: "Gasolina" , km:"12323" , year:"2011",price:700000,UserUserName:'lruiz' }).then(function(c){
													Images.create({imagepath:'./cars/4.jpg',CarId:c.id});
												});
					});
				});

			});			
		});
	});
Users.create({userName: 'gwu',password: '123123',email: 'gilvenwu@gmail.com',isAdmin : true}).then(function(){
	Colors.create({name: 'Negro'}).then(function(){
		Manufacturers.create({name:'BMW'}).then(function(){
			Models.create({name: 'M-8',ManufacturerId:3}).then(function(){
				Cars.create({ManufacturerId:3 , ModelId:5 ,  ColorId:5, transmision:"Tracción Trasera",
							combustible: "Gasolina" , km:"123353" , year:"2012",price:800000,UserUserName:'gwu' }).then(function(c){
													Images.create({imagepath:'./cars/5.jpg',CarId:c.id});
												});
			});
			Colors.create({name: 'Rojo Vino'}).then(function(){
				Models.create({name: 'M-6',ManufacturerId:3}).then(function(){
					Cars.create({ManufacturerId:3 , ModelId:6 ,  ColorId:6, transmision:"Tracción Trasera",
					combustible: "Gasolina" , km:"123363" , year:"2013",price:900000,UserUserName:'gwu' }).then(function(c){
													Images.create({imagepath:'./cars/6.jpg',CarId:c.id});
												});
				});
			});
		});
	});

});











