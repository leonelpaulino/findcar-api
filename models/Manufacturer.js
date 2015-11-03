'use strict'
module.exports = ManufacturerModel;
//Modelos de los fabricantes.
function ManufacturerModel (db,types) {
	 	var Model = db.define('Manufacturer',{
		name: {type: types.STRING}
},
{
	classMethods: {
		associate: function (models){
			Model.hasMany(models.Model,{as: 'Models'});
			Model.hasMany(models.Car, {as: 'Cars'});
		}
	}
}
);
 	return Model;
}