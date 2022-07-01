const mongoose = require('mongoose');

const tourScema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'A tour must have a uniq name'],
    required: [true, 'A tour must have a name'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a '],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourScema);

module.exports = Tour;
