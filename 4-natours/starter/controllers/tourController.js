const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
    try{
        // BUILD THE QUERY
        // 1) FILTERING
        // spread the query to create a new object that can be modify
        const queryObj = { ...req.query };
        // save different query types that we then iterate over to delete them from the query url.
        const excludedFields = ['page', 'sort', 'limit', 'field'];
        excludedFields.forEach(el => delete queryObj[el]);

        // 2) ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        // Mongodb query
        // console.log(JSON.parse(queryStr));
        let query = Tour.find(JSON.parse(queryStr));

        // mongoose method to filter the query
        // const tours = await Tour.find().where('duration').equals(5).where('duration').equals('easy');
        // console.log(req.query.sort);
        // 3) SORTING
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy);
        }
        else{
            query = query.sort('-createdAt');
        };

        // 4) FIELD LIMITING
        if(req.query.field){
            const fields = req.query.field.split(',').join(' ');
            query = query.select(fields)
        }else{
            query = query.select('-__v');
        };

        // 5) PAGINATION
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        // if query contains a page query
        // count the number of documents/tours in the DB
        // check if the skip number is bigger or equal to the number of documents/tours
        // if yes throw and error which will fall directly in the catch block below.
        if(req.query.page){
            const numTours = await Tour.countDocuments();
            if(skip >= numTours) throw new Error('This page does not exist');
        }

        // EXECUTE THE QUERY
        const tours = await query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            data: {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
};

exports.getTour = async (req, res) => {
    try{
        const tour = await Tour.findById(req.params.id);
    
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
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
            message: err
        })
    }
};

exports.updateTour = async (req, res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            // will return the updated document to the client
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    };
};

exports.deleteTour = async (req, res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    };
};