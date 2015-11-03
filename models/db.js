'use strict';
// Modelo de la base de datos. (se requiere este modulo a la hora de utilizar cualquier entidad de la base de datos).
var fs        = require('fs'); // Modulo para leer archivos.
var path      = require('path'); // Modulo para trabajar con los path del ordenador.
var Sequelize = require('sequelize'); // Sequelizer.
var basename  = path.basename(module.filename); //toma el nombre del archivo (este archivo)
var env       = process.env.NODE_ENV || 'development'; // Busca en el json de configuracion la configuracion para development.
var config    = require(__dirname + '/../config/config.json')[env]// busca el archivo de configuracion.;
var db        = {}; // Donde se va guardar el schema de la base de datos.
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync(); // En caso de que se haga algun cambio se reflejara en la base de datos.
db.Sequelize = Sequelize;
module.exports = db; 
