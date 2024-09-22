const express = require('express');
const Flight = require('./models/Flight'); // Ganti dengan path yang sesuai
const router = express.Router();

// Get all flights
router.get('/api/flights/get', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).send(flights);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a flight by ID
router.get('/api/flights/get/:id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send();
        }
        res.status(200).send(flight);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
