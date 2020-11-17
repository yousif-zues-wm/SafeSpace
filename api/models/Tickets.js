/**
 * Tickets.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {

  attributes: {

    CompanyName: {
      type: 'string',
      required: true,
      unique: false,
      maxLength: 200
    },
    desc: {
      type: 'string',
      required: true,
      unique: false,
    },
    ct: {
      type: 'string',
      required: true,
      unique: false,
    }, 
    Submit: {
      type: 'string',
      required: false,
      unique: false,
      maxLength: 32
    }

  },

};

