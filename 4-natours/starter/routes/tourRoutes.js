const express = require('express');
const { getAllTours, getTour, createTour, updateTour, deleteTour, topTours, getTourStats } = require('../controllers/tourController')
const router = express.Router();

// param middleware to check if id is valid before hitting any routes
// val give us the value of the id
// router.param('id', checkId);


// alias route to get only the top 5, cheapest tours
router.route('/top-5-tours').get(topTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/')
    .get(getAllTours)
    .post(createTour)

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;