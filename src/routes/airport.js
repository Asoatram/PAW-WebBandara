const express = require('express');
const Flight = require('./models/Airport'); // Ganti dengan path yang sesuai
const router = express.Router();

// Get all airport
router.get('/api/airport/get', async (req, res) => {
    try {
        const airport = await Airport.find();
        res.status(200).send(airport);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a airport by ID
router.get('/api/airport/get/:id', async (req, res) => {
    try {
        const airport = await AbortSignalirport.findById(req.params.id);
        if (!airport) {
            return res.status(404).send();
        }
        res.status(200).send(airport);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;