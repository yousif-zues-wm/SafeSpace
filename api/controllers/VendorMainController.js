/**
 * VendorMainController
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
    vendorlogin: function(req ,res){

        return res.view('vendorlogin.ejs')
      
      },
      
    vendorloginp: async function(req ,res){
    var data = await VendorMain.findOne(req.allParams())
    if (!data) {
    return res.send('Login Info Incorrect')
    }
    else{
    res.cookie('token', atob(data.uname))
    return res.redirect('/vendorprofile')
    
    }
    },
    
    vendorsignup: function(req ,res){
    return res.view('vendorsignup.ejs')
    
    },
    vendorsignupp: async function(req ,res){
    // signup action
    try{
    var data = await VendorMain.create(req.allParams()).fetch()
    
    if (!data) {
    return res.redirect('/vendorsignup?e=2')
    }
    else{
    res.cookie('token', atob(data.CompanyName))
    return res.redirect('/vendorprofile')
    
    
    
    }
    }
    catch(e){
    return res.redirect('/vendorsignup?e=2')
    
    }
    
    },
    vendorprofile: async function(req, res){
    if (req.cookies.token == '' || req.cookies.token == undefined || req.cookies.token == null) {
        console.log("here1")
        return res.redirect('/vendorlogin')
    }
    try {
    var uname = btoa(req.cookies.token)
    var data = await VendorMain.findOne({'uname' : uname})
    
    if (!data) {
        console.log("here2")

        return res.redirect('/vendorlogin')
    }
    else{
        res.view('vendorprofile.ejs', {data : data})
    }
    
    } catch (e) {
        console.log(e)

    res.redirect('/vendorlogin')
    }
    }
};

