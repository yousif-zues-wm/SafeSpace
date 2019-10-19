/**
 * Main.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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
