'use strict'
module.exports = CarWishListModel;
//Modelo de la relacion de los carros y la lista de deseo.
function CarWishListModel (db,types) {
	 	var Model = db.define('CarWishList',{
	carId: {
	 type: types.INTEGER,
		unique: 'CarWishList',
		primaryKey: true
	},
	wishListId: {
	 type: types.INTEGER,
		unique: 'CarWishList',
		primaryKey: true
	}
});
 	return Model;
}