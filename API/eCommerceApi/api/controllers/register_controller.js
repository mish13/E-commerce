'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var crypto = require('crypto');
var sql = require('./db.js');


/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    register : register
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function register(req, res) {
    // var registerInfo = JSON.parse(req.swagger.params.registerInfo);
    // console.log(registerInfo.email + " " + registerInfo.password);

    var registerInfo = JSON.stringify(req.swagger.params.registerInfo);
    registerInfo = JSON.parse(registerInfo).value;
    var firstname = registerInfo.firstname;
    var lastname = registerInfo.lastname;
    var email = registerInfo.email;
    var password = registerInfo.password;

    var pHash = crypto.createHash('md5').update(password).digest('hex');
    var queryStmt = `insert into users (firstname,lastname,email,password,accountno,secret,flag) values ('${firstname}','${lastname}','${email}','${pHash}','dummy','dummy','0')`;



    sql.query(queryStmt, function (err, result) {
        if(err) {
            res.json(false);
        } else{
            res.json(true);
        }
    });


}
