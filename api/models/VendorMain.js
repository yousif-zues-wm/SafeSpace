/**
 * VendorMain.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    CompanyName: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200
    },
    Description: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200
    },
    PhoneNumber: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200
    },
    logo : {
      type : 'string'
      required: true,
      unique: true,
    },
    uname: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200
    },
    pw: {
      type: 'string',
      required: true,
      unique: false,
      maxLength: 32
    },
    Submit: {
      type: 'string',
      required: false,
      unique: false,
      maxLength: 32
    }

  },

};

