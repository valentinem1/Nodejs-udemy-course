const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
}

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

// // GET request
// app.get('/api/v1/tours', getAllTours);
// // GET one tour request
// app.get('/api/v1/tours/:id', getTour);
// // POST request
// app.post('/api/v1/tours', createTour);
// // PATCH request
// app.patch('/api/v1/tours/:id', updateTour);
// // DELETE request
// app.delete('/api/v1/tours/:id', deleteTour);

// GET/POST requests
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour)
// GET/PATCH/DELETE request
app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

// SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
