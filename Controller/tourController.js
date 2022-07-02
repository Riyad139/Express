const { findOneAndDelete } = require('./../Model/TourModel');
const Tour = require('./../Model/TourModel');

exports.getAllTours = async (req, res) => {
  let objQuery = { ...req.query };
  const excludeField = ['page', 'sort', 'limit', 'fields'];
  excludeField.forEach((el) => delete objQuery[el]);

  let queryStr = JSON.stringify(objQuery);

  objQuery = JSON.parse(
    queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
  );

  console.log(req.query, objQuery);

  try {
    const tours = await Tour.find(objQuery);

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
