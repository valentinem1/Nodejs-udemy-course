const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
    res.status(200).json({
        // requestedAt: req.requestTime,
        // status: 'success',
        // data: {
        //     tours
        // }
    });
};

exports.getTour = (req, res) => {
    // const tour = tours.find(tour => tour.id === parseInt(req.params.id));

    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour
    //     }
    // });
};

exports.createTour = async (req, res) => {
    // Other way to create a new Tour
    // const newTour = new Tour(req.body);
    // newTour.save();
    try {
        const newTour =  await Tour.create(req.body);
    
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!'
        })
    }
};

exports.updateTour = (req, res) => {
    // res.status(200).json({
    //     status: 'success',
    //     data: {
    //         tour: updatedTour
    //     }
    // });
};

exports.deleteTour = (req, res) => {
    // res.status(204).json({
    //     status: 'success',
    //     data: null
    // });
};