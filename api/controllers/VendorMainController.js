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

      admin : async function(req, res){
        var token = decrypt(req.param("token"))

      var info = await Main.findOne({'uname': token})

      if (!info) {
        return res.send('false')
      }
      else{
        try {
          if (data.oobo == 'true') {
            return res.send('true')

          }
          else{
            return res.send('false')
          }
        } catch (e) {
          return res.send('false')
        }
      }
      },

    vendorsignup: function(req ,res){


      if (req.cookies.token == '' || req.cookies.token == undefined || req.cookies.token == null) {
        return res.redirect('/login')

      }
      else{
        return res.view('vendorsignup.ejs')
      }
      // var info = await Main.findOne({'uname': token})
      //
      // if (!info) {
      //   return res.redirect('/')
      // }
      // else{
      //   try {
      //     if (data.oobo == 'true') {
      //       return res.view('vendorsignup.ejs')
      //
      //     }
      //     else{
      //       return res.redirect('/')
      //     }
      //   } catch (e) {
      //     return res.redirect('/')
      //   }
      // }
    },

    vendorsignupp: async function(req ,res){
    // signup action

    var token = decrypt(req.cookies.token)

    var info = await Main.findOne({'uname': token})

    if (!info) {
      return res.redirect('/')
    }
    else{
      try {
        if (data.oobo == 'true') {

              console.log(req.allParams());
              try{

              var data = await VendorMain.create(req.allParams()).fetch()

              if (!data) {
                console.log('HERE1');
              return res.redirect('/vendorsignup?e=2')
              }
              else{
              return res.redirect('/profile')



              }
              }
              catch(e){
              return res.redirect('/vendorsignup?e=2')

              }
        }
        else{
        return  res.redirect('/')
        }
      } catch (e) {
        return res.redirect('/')
      }
    }






    }
  };
