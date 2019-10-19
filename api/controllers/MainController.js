/**
 * MainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


var axios = require('axios')
var atob = require('atob')
var btoa = require('btoa')
module.exports = {
index: function(req ,res){

  return res.view('index.ejs')

},

login: function(req ,res){

  return res.view('login.ejs')

},

loginp: async function(req ,res){
var data = await Main.findOne(req.allParams())
if (!data) {
  return res.redirect('/login?e2')
}
else{
res.cookie('token', atob(data.uname))
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
res.cookie('token', atob(data.uname))
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
  var name = btoa(req.cookies.token)
  var data = await Main.findOne({'uname' : name})

  if (!data) {
    console.log('this one');
    return res.redirect('/login')
  }
  else{
    res.view('profile.ejs', {data : data})
  }

  } catch (e) {
  res.redirect('/login')
  }
}

};
