const Tour = require('../models/tourModel');

// middleware to check if the body of th request includes the name or price before creating a tour 
exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        res.status(400).json({
            status: "fail",
            message: "Missing name or price"
        });
    };
    next();
};

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

exports.createTour = (req, res) => {
    // res.status(201).json({
    //     status: 'success',
    //     data: {
    //         tour: newTour
    //     }
    // });
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