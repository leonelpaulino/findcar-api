'use strict'
module.exports = CarModel;
function CarModel (db,types) {
	 	var Model = db.define('Car',
	 	{
	  		transmision: {
		    type: types.ENUM('Tracción Trasera', 'Tracción Delantera', 
		    					 'Tracción Trasera y Traccion Delantera')
			},
			combustible: {
			 type: types.ENUM ('Gasolina','Disel')
			},
			km: types.INTEGER,
			year: types.INTEGER,
			price: types.INTEGER,
		},
	{
		classMethods: {
			associate: function(models){
				Model.belongsTo(models.Model);
				Model.belongsTo(models.User);
				Model.belongsTo(models.Color);
				Model.belongsTo(models.Manufacturer);
				Model.hasMany(models.Image);
				Model.belongsToMany(models.WishList,{
					through: {
						model: models.CarWishList,
						unique: true,
					},
					foreignKey: 'CarId',
				});
			}
		}
	}
);
 	return Model;
}