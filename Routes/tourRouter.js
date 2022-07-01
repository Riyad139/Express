const express = require('express');

const tourController = require('./../Controller/tourController');

const route = express.Router();

route
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

route
  .route('/:id')
  .get(tourController.getToursById)
  .put(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = route;
