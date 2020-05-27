const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();


// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log('middleware function!');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// ROUTE HANDLERS

// TOURS
const getAllTours = (req, res) => {
    res.status(200).json({
        requestedAt: req.requestTime,
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

// USERS
const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not defined yet'
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not defined yet'
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not defined yet'
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not defined yet'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'route not defined yet'
    });
};

// ROUTES
const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// TOURS
tourRouter.route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

// USERS
userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

// SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
