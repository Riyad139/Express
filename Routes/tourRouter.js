const express = require('express');

const tourController = require('./../Controller/tourController');

const route = express.Router();

route
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

route.get('/:id', tourController.getToursById);
route.put('/:id',tourController.updateTour);

module.exports = route;
