'use strict'
module.exports = CarModel;
function CarModel (db,types) {
	 	var Model = db.define('Car',{
  		transmision: {
	    type: types.ENUM('Tracción Trasera', 'Tracción Delantera', 
	    					 'Tracción Trasera y Traccion Delantera')
		},
		combustible: {
		 type: types.ENUM ('Gasolina','Disel')
		},
		km: types.INTEGER,
		year: types.INTEGER,
		price: types.INTEGER
},
	{
		classMethod: {
			associate: function(models){
				car.belongsTo(models.Model, {as: 'Model'});
				car.belongsTo(models.User, {as : 'User'});
				car.belongsTo(models.Colors,{as: 'Color'});
				car.belongsTo(models.Manufacturer,{as: 'Manufacturer'});
				car.belongsToMany(models.WishList,{
					through: {
						model: models.CarWishList,
						unique: false,
					},
					foreignKey: 'CarId',
				});
			}
		}
	}
);
 	return Model;
}