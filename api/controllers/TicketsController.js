/**
 * TicketsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  profile: async function(req, res){
    console.log(req.url);
    try{
    var data = await VendorMain.findOne({'CompanyName': decodeURI(req.url.split('?=')[1])})
    if (!data) {
      return res.redirect('/profile')
    }
    else{
      res.view('cprofile.ejs', {data: data})
    }
  }
  catch(e){
    return res.redirect('/profile')
  }
  }

};
