'use strict'
module.exports = TokenModel;
function TokenModel (db,types) {
	 	var Model = db.define('Token',{
  		token: {
	    type: types.STRING,
	    primaryKey: true
		},
});
 	return Model;
}