const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cardNumber: {
    type: String,
    required: true,
    minlength: 13,
    maxlength: 19,
  },
  expiration: {
    type: String,
    required: true,
  },
});

module.exports = paymentMethodSchema;
