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
        const limit = 5; // Number of flights per page
        const skip = (page - 1) * limit;

        // Get the search parameter (departure_airport_code) if provided
        const { departure_airport_code } = req.query;

        let query = {};

        // If departure_airport_code is provided, create a regex for partial matching (case-insensitive)
        if (departure_airport_code) {
            query.departure_airport_code = new RegExp(`^${departure_airport_code}`, "i"); // "i" for case-insensitive
        }

        // Fetch flights matching the query, with pagination
        const flights = await Flight.find(query).skip(skip).limit(limit);
        
        // Count total flights matching the query
        const totalFlights = await Flight.countDocuments(query);

        // Determine if there is a next page and return 1 or 0
        const hasNextPage = totalFlights > skip + limit ? 1 : 0;

        if (flights.length === 0) {
            return res.status(404).send({ message: "No flights found", hasNextPage });
        }

        res.status(200).send({ flights, hasNextPage });
    } catch (error) {
        res.status(500).send({ error: "Server Error", details: error.message });
    }
});

router.delete('/api/flight/delete/:id', async (req, res) => {
    try {
        const flights = await Flight.findByIdAndDelete(req.params.id)
        if (!flights) {
            return res.status(404).send();
        }
        return res.status(200).send("Deleted");
    }catch (error){
        res.status(500).send(error);
    }
})