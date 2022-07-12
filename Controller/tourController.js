const { findOneAndDelete } = require('./../Model/TourModel');
const Tour = require('./../Model/TourModel');
const ApiFeature = require('./../utils/ApiFeature');

exports.getAllTours = async (req, res) => {
  try {
    //Executing query
    const feature = new ApiFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .fields()
      .page();
    const tours = await feature.query;
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getToursById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {}
};

exports.updateTour = async (req, res) => {
  try {
    const Id = req.params.id;

    const updatedTour = await Tour.updateOne(
      { _id: Id },
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      status: 'Success',
      data: {
        tour: await Tour.findById(Id),
      },
    });
  } catch (error) {
    res.status(404).json({
      message: 'No tour found by that id',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'Success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.json(err);
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      message: 'success',
    });
  } catch (err) {
    res.status(404).json({
      message: 'something went wrong',
    });
  }
};

exports.getToursState = async (req, res) => {
  try {
    const state = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: '$difficulty',
          averageRating: { $avg: '$ratingsAverage' },
        },
      },
    ]);
    res.status(200).json({
      status: 'Success',
      data: {
        tours: state,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: err,
    });
    console.log(err);
  }
};
