const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// GET request
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
});

// GET one tour request
app.get('/api/v1/tours/:id', (req, res) => {
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
});

// POST request
app.post('/api/v1/tours', (req, res) => {
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
})

// PATCH request
app.patch('/api/v1/tours/:id', (req, res) => {
    // console.log(req.body.name);

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
})

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


// app.get('/', (req, res) => {
//     res.status(200).json({ message: 'Hello from the server!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//     res.send('You can now post to this endpoint.')
// });