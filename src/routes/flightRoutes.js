const express = require('express');
const Flight = require('../controller/flightController.js'); // Ganti dengan path yang sesuai
const router = express.Router();

// Get flight by pages
router.get('/api/flight', Flight.getPageFlight);

// Get a flight by airport ID
router.get('/api/flight', Flight.getAllFlightBySearch);

router.get('/api/flight/all', Flight.getAllFlight)

module.exports = router;
