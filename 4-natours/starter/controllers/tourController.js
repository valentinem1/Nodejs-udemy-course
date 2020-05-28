const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// param middleware to check if id is valid before hitting any routes
// val give us the value of the id
exports.checkId = (req, res, next, val) => {
    // console.log(`This is the id: ${val}`);

    if(parseInt(val) > tours.length){
        return res.status(400).json({
            status: "fail",
            message: "Invalid ID"
        });
    };
    next();
};

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
        requestedAt: req.requestTime,
        status: 'success',
        data: {
            tours
        }
    });
};

exports.getTour = (req, res) => {
    const tour = tours.find(tour => tour.id === parseInt(req.params.id));

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    const newId = tours[tours.length -1].id + 1;
    const newTour = {...req.body, id: newId};

    tours.push(newTour);
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

exports.updateTour = (req, res) => {
    const tour = tours.find(tour => tour.id === parseInt(req.params.id));

    const updatedTour = {...tour, name: req.body.name};
    const updatedTours = tours.map(tour => tour.id === parseInt(req.params.id) ? updatedTour : tour);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), err => {
        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        });
    });
};

exports.deleteTour = (req, res) => {
    const updatedTours = tours.filter(tour => tour.id !== parseInt(req.params.id));

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), err => {
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
};