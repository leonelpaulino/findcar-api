'use strict'
module.exports = CarWishListModel;
//Modelo de la relacion de los carros y la lista de deseo.
function CarWishListModel (db,types) {
 	var Model = db.define('CarWishList',{
		CarId: {
		 type: types.INTEGER,
			unique: 'CarWishList',
			primaryKey: true
		},
		WishListId: {
		 type: types.INTEGER,
			unique: 'CarWishList',
			primaryKey: true
		}
});
 	return Model;
}