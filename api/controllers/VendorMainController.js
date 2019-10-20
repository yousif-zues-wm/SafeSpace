/**
 * VendorMainController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var axios = require('axios')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const multer = require('multer')


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
    vendorlogin: function(req ,res){

        return res.view('vendorlogin.ejs')

      },

    vendorloginp: async function(req ,res){
    var data = await VendorMain.findOne(req.allParams())
    if (!data) {
    return res.send('Login Info Incorrect')
    }
    else{
    res.cookie('token', encrypt(data.uname))
    return res.redirect('/vendorprofile')

    }
    },

    vendorsignup: function(req ,res){
    return res.view('vendorsignup.ejs')

    },
    vendorsignupp: async function(req ,res){
    // signup action
    console.log(req.allParams());
    try{

    var data = await VendorMain.create(req.allParams()).fetch()

    if (!data) {
      console.log('HERE1');
    return res.redirect('/vendorsignup?e=2')
    }
    else{
      console.log(data.uname);
    res.cookie('token', encrypt(data.uname))
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
    var uname = decrypt(req.cookies.token)
    console.log(uname);
    var data = await VendorMain.findOne({'uname' : uname})
      console.log(data);
    if (!data) {
        console.log("here2p")

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
