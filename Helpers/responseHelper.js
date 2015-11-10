exports.version = "1.0.0";
/* 
* @brief
*  Helper que se encarga de crear el 
*  response dado el codigo http, error y data
* @param [res] Respuesta del servidor.
* @param [http_code] codigo de la respuesta.
* @param [error] Error si existe alguno ( puede ser null).
* @param [data]  dato de retorno en caso de que se requiera.
*/
exports.sendResponse = function (res, http_code , err, data){
if (err != null) {
	var message = err.message;
}
res.writeHead(http_code,{"Content-Type": "application/json"});
res.end(JSON.stringify({error: !!err , message: message, data: data}) + "\n");
}