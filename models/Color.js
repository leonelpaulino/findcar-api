'use strict'
module.exports = ColorModel;
//Modelo de los colores
function ColorModel (db,types) {
	 	var Model = db.define('Color',
	 	{
			name: {type: types.STRING}
		},
		{
	 		classMethods: {
			 	associate: function (models){
			 		Model.hasMany(models.Car, {as: 'Cars'});
			 	}
		 	}
		}
);
 	return Model;
}