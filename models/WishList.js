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
				Model.belogsTo(models.User);
				Model.belongsToMany(models.Car,{
					through: {
					model: models.CarWishList,
					unique: true,
				},
				foreignKey: 'WishListId',
				});
			}
		}
	}
);
 	return Model;
}