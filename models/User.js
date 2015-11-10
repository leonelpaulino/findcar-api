'use strict'
var bcrypt = require('bcrypt-nodejs');
module.exports = UserModel;
//Modelo del usuario.
function UserModel (db,types) {
	 	var Model = db.define('User',
 	{
		userName: {
			type: types.STRING,
			primaryKey: true,
			allowNull: false,
			validate: {
				min: {
					args:5,
					msg: 'El usuario debe de contener más de 5 caracteres'
				}
			}
		},
		email: {
			type: types.STRING,
			allowNull: false,
			validate: {
				isEmail: {
					args:true,
					msg:'El correo electronico no es valido'
				}
			}
		},
  		password: {
		    type: types.STRING,
		    allowNull: false,
		    validate: {
		    	min:{
					args:6,
					msg: 'La contraseña debe de contener mas de 6 catracteres'
				}
		    },
		    set: function (val) {
	    		 var salt = bcrypt.genSaltSync(10);
		         var value = bcrypt.hashSync(val);
		         this.setDataValue('password',value);
		     }
		},
		isAdmin: {
			type: types.BOOLEAN,
			allowNull: false
		}
	},
	{
		classMethods: {
			associate: function(models){
			 Model.hasMany(models.Car, {as: 'Cars'});
			 // Model.hasOne(models.WishList,{as:'WishList'})
			},
	      	verifyPassword: function(password,hashPassword) {
       	 		return bcrypt.compareSync(password, hashPassword); {
        		}
      		}
		}
	});
 	return Model;
}