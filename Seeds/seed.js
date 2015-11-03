var model = require('../models/db.js');	
var Users = model.User;
var Colors = model.Color
var Models = model.Model;		
var Manufacturers = model.Manufacturer;
var Cars = model.Car;
Users
  .create({userName: 'lpaulino',password: '123123',email: 'leonelpaulino18@gmail.com',isAdmin : true});
Users
  .create({userName: 'lruiz',password: '123123',email: 'luimiruiz@gmail.com',isAdmin : true});
Users
  .create({userName: 'gwu',password: '123123',email: 'gilvenwu@gmail.com',isAdmin : true});

Colors
	.create({name:'Azul'});
Colors
	.create({name: 'Rojo'});
Colors
	.create({name: 'Amarillo'});
Colors
	.create({name: 'Verde'});
Colors
	.create({name: 'Negro'});
Manufacturers
	.create({name:'Honda'});
Manufacturers
	.create({name:'Toyota'});
Manufacturers
	.create({name:'BMW'});
Manufacturers
	.create({name:'Mercedes'});
Models
	.create({name: 'Civic',ManufacturerId:1});
Models
	.create({name: 'Acoord',ManufacturerId:1});
Models
	.create({name: 'Corolla',ManufacturerId:2});
Models
	.create({name: 'Camry',ManufacturerId:2});
Models
	.create({name: 'M-8',ManufacturerId:3});
Models
	.create({name: 'M-6',ManufacturerId:3});
Models
	.create({name: 'E 200',ManufacturerId:4});
Models	
	.create({name: 'E 250',ManufacturerId:4});
Cars.
	create({ManufacturerId:1 , ModelId:1 ,  ColorId:1, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"12333" , year:"2010",price:400000, UserUserName:'gwu' });
Cars.
	create({ManufacturerId:1 , ModelId:2 ,  ColorId:2, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"1233" , year:"2000",price:500000,UserUserName:'lpaulino' });
Cars.
	create({ManufacturerId:2 , ModelId:3 ,  ColorId:3, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"123332" , year:"2009",price:40000,UserUserName:'lruiz' });
Cars.
	create({ManufacturerId:2 , ModelId:4 ,  ColorId:4, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"12323" , year:"2011",price:700000,UserUserName:'gwu' });
Cars.
	create({ManufacturerId:3 , ModelId:5 ,  ColorId:5, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"123353" , year:"2012",price:800000,UserUserName:'lpaulino' });
Cars.
	create({ManufacturerId:3 , ModelId:6 ,  ColorId:1, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"123363" , year:"2013",price:900000,UserUserName:'gwu' });
Cars.
	create({ManufacturerId:4 , ModelId:7 ,  ColorId:2, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"123733" , year:"2014",price:200000,UserUserName:'lpaulino' });
Cars.
	create({ManufacturerId:4 , ModelId:8 ,  ColorId:3, transmision:"Tracción Trasera",
			combustible: "Gasolina" , km:"124333" , year:"2015",price:100000,UserUserName:'lruiz' });
