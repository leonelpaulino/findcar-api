'use strict'
module.exports = WishListModel;
//Modelo de la lista de deseo.
function WishListModel (db,types) {
	 	var Model = db.define('WishList',
	 	{
		},
	{
		classMethod: {
			associate: function(models){
				Model.belogsTo(models.user);
				Model.belongsToMany(models.car,{
					through: {
					model: models.car_wishlist,
					unique: false,
				},
				foreignKey: 'WishListId',
				});
			}
		}
	}
);
 	return Model;
}