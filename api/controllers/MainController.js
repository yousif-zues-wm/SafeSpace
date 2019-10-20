/**
 * @Author: zyousif
 * @Date:   2019-10-20T00:51:18-07:00
 * @Last modified by:   zyousif
 * @Last modified time: 2019-10-20T02:58:02-07:00
 */



/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


var axios = require('axios')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

module.exports = {
index: function(req ,res){

  return res.view('index.ejs')

},

login: function(req ,res){

  return res.view('login.ejs')

},
aboutUs: function(req ,res){

  return res.view('aboutUs.ejs')

},
loginp: async function(req ,res){
var data = await Main.findOne(req.allParams())
if (!data) {
  return res.redirect('/login?e2')
}
else{
res.cookie('token', encrypt(data.uname))
return res.redirect('/profile')

}
},

signup: function(req ,res){
  return res.view('signup.ejs')

},
signupp: async function(req ,res){
  // signup action
  try{
var data = await Main.create(req.allParams()).fetch()

if (!data) {
  return res.redirect('/signup?e2')
}
else{
res.cookie('token', encrypt(data.uname))
return res.redirect('/profile')



}
}
catch(e){

  return res.redirect('/signup?e2')

}

},

profile: async function(req, res){
  if (req.cookies.token == '' || req.cookies.token == undefined || req.cookies.token == null) {
    return res.redirect('/login')
  }
  try {
  var name = decrypt(req.cookies.token)
  console.log(name);
  console.log(req.cookies.token);
  var data = await Main.findOne({'uname' : name})

  var vendor = await VendorMain.find({})

  var finalData = {}

  finalData['user'] = data
  finalData['vendor'] = vendor

  if (!data) {
    console.log('this one');
    return res.redirect('/login')
  }
  else{
    res.view('profile.ejs', {data : finalData})
  }

  } catch (e) {
  res.redirect('/login')
  }
},
logout: function(req, res){
  if (req.cookies.token == '' || req.cookies.token == undefined || req.cookies.token == null) {
    return res.redirect('/')
  }
  else{
    res.clearCookie('token')
    return res.redirect('/')
  }
}


// LOGIN SHIT ABOVE

















};
