'use strict'
module.exports = ModelsModel;
//Modelo de los diferentes tipos de carros (modelos)
function ModelsModel (db,types) {
 	var Model = db.define('Model',
 		{
			name: {type: types.STRING}
		},
		{
	 		classMethods: {
			 	associate: function (models){
			 		Model.belongsTo(models.Manufacturer, {as: 'Manufacturer'});
			 		Model.hasMany(models.Car, {as: 'Cars'});
			 	}
		 	}
		}
);
 	return Model;
}