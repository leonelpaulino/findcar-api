'use strict'
module.exports = ImagesModel;
function ImagesModel (db,types) {
	 	var Model = db.define('Image',
	 	{
	  		imagepath: {
		    	type: types.STRING,
		    	primaryKey: true
			}
		},
		{
	 		classMethods: {
			 	associate: function (models){
			 		Model.belongsTo(models.Car);
			 	}
		 	}
		}
);
 	return Model;
}