/**
 * @Author: zyousif
 * @Date:   2019-10-20T00:51:18-07:00
 * @Last modified by:   zyousif
 * @Last modified time: 2019-10-20T04:19:20-07:00
 */



/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

'GET /' : 'Main/index',
'GET /login': 'Main/login',
'POST /login' : 'Main/loginp',
'GET /signup': 'Main/signup',
'POST /signup' : 'Main/signupp',
'GET /profile' : 'Main/profile',
'GET /vendorsignup' : 'VendorMain/vendorsignup',
'POST /vendorsignup' : 'VendorMain/vendorsignupp',
'GET /profile' : 'Main/profile' ,
'GET /aboutUs' : 'Main/aboutUs',
'GET /logout' : 'Main/logout',
'GET /cprofile' : 'Tickets/profile',
'POST /admin' : 'VendorMain/admin',
'POST /cprofile' : 'Tickets/profilep',


};
