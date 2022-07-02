const mongoose = require('mongoose');

const tourScema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'A tour must have a uniq name'],
    required: [true, 'A tour must have a name'],
  },
  // startLocation: {
  //   type: String,
  //   coordinates: [Number],
  //   description: String,
  //   address: String,
  //   required: [true, 'a tour must need a starting'],
  // },
  difficulty: {
    type: String,
    default: 'medium',
  },

  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  // durationWeeks: {
  //   type: Number,
  //   required: [true, 'A tour must have a duration week'],
  // },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour need members'],
  },
  summary: {
    type: String,
    required: [true, 'please add summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
  },
  locations: [Object],
  slug: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
  },
  coordinates: [Number],
  images: [String],
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
  guides: [Object],
  price: {
    type: Number,
    required: [true, 'A tour must have a '],
  },
  imageCover: {
    type: String,
    required: [true, 'a cover pic needed'],
  },
  locations: [Object],
  reviews: {
    type: String,
  },

  ratingQuantity: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourScema);

module.exports = Tour;
