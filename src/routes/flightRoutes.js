const express = require('express');
const Flight = require('../model/flight'); // Ganti dengan path yang sesuai
const router = express.Router();

// Get all flights
router.get('/api/flights/get', async (req, res) => {
    try {
        var flights = await Flight.find({});
        res.status(200).send({data : flights});
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

// Backend API endpoint to get flights with optional search
router.get("/api/flight/get", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * 5;

        // Get the search parameter (departure_airport_code) if provided
        const { departure_airport_code } = req.query;

        let query = {};

        // If departure_airport_code is provided, create a regex for partial matching (case-insensitive)
        if (departure_airport_code) {
            query.departure_airport_code = new RegExp(`^${departure_airport_code}`, "i"); // "i" for case-insensitive
        }

        // Fetch flights matching the query, with pagination
        const flights = await Flight.find(query).skip(skip).limit(5);

        if (flights.length === 0) {
            return res.status(404).send("No flights found");
        }

        res.status(200).send(flights);
    } catch (error) {
        res.status(500).send({ error: "Server Error", details: error.message });
    }
});
