/**
 * TicketsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  profile: async function(req, res){
    try{
    var data = await VendorMain.findOne({'CompanyName': decodeURI(req.url.split('?view=')[1])})
    console.log(data)
      
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
    
  },
  profilep: async function(req ,res){
    // issue creation
    console.log(req.allParams());
    try{

    var data = await Tickets.create(req.allParams()).fetch()
    console.log(data);
    if (!data) {
      return res.redirect('/cprofile')
    }
    else{
      return res.redirect('/profile')



    }
    }
    catch(e){
      return res.redirect('/cprofile')

    }

    }


};