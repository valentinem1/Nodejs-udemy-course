const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

exports.getAllTours = (req, res) => {
    res.status(200).json({
        requestedAt: req.requestTime,
        status: 'success',
        data: {
            tours
        }
    });
}

exports.getTour = (req, res) => {
    const tour = tours.find(tour => tour.id === parseInt(req.params.id));
        
    if(!tour){
        return res.status(400).json({
            status: "fail",
            message: "Invalid ID"
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

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
}

exports.updateTour = (req, res) => {
    const tour = tours.find(tour => tour.id === parseInt(req.params.id));

    const updatedTour = {...tour, name: req.body.name};
    const updatedTours = tours.map(tour => tour.id === parseInt(req.params.id) ? updatedTour : tour);

    if(!tour){
        return res.status(400).json({
            status: "fail",
            message: "Invalid ID"
        });
    };

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), err => {
        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        });
    });
}

exports.deleteTour = (req, res) => {
    const updatedTours = tours.filter(tour => tour.id !== parseInt(req.params.id));

    if(parseInt(req.params.id) > tours.length){
        return res.status(400).json({
            status: "fail",
            message: "Invalid ID"
        });
    };

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), err => {
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}