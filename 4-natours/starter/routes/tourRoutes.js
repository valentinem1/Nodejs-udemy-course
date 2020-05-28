const express = require('express');
const { getAllTours, getTour, createTour, updateTour, deleteTour, checkId, checkBody } = require('../controllers/tourController')
const router = express.Router();

// param middleware to check if id is valid before hitting any routes
// val give us the value of the id
router.param('id', checkId);

router.route('/')
    .get(getAllTours)
    .post(checkBody, createTour)

router.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;