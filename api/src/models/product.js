const mongoose = require('mongoose');

// Defines the data model for a product
const producSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 50 // Set the maximum length to 50 characters
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          // Use a regular expression to check that the price has no more than 2 decimal places
          return /^(\d*\.\d{1,2}|\d+)$/.test(value.toString());
        },
        message: 'Price should have no more than 2 decimal places'
      }
    }
  });
  

// Exporta el modelo de datos
module.exports = mongoose.model('product', producSchema);