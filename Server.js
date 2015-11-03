var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	UserController = require('./Controller/UserController.js'),
	CarController = require('./Controller/CarController.js'),
	ManufacturerController = require('./Controller/ManufacturerController.js'),
	ColorController = require('./Controller/ColorController.js'),
	ModelController = require('./Controller/ModelController.js'),
	authentication = require('./Helpers/AuthenticationHelper').authentication2,
	responseHelpers = require('./Helpers/responseHelper.js'),
	cors = require('cors');
	morgan = require('morgan');
	fs = require('fs');
	FileStreamRotator = require('file-stream-rotator');
	logdir = __dirname + '/logs';
fs.existsSync(logdir) || fs.mkdirSync(logdir);
var accessLogStream = FileStreamRotator.getStream({
  filename: logdir + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
})
app.use(morgan('combined',{stream: accessLogStream}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/users',UserController);

app.use('/cars',CarController);

app.use('/manufacturers',ManufacturerController);

app.use('/models',ModelController);

app.use('/colors',ColorController);


app.all("*",function(req,res){
	responseHelpers.sendResponse(res,200,{message:"Route Not Found!,Api Is Up And Running!!!!"},null);
});
app.listen(3000);