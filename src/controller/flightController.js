const { model } = require('mongoose');
const Flight = require('../model/flight.js');


exports.getPageFlight = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit; // Corrected skip calculation

    try {
        const flights = await Flight.find({}).skip(skip).limit(limit); // Corrected syntax
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAllFlightBySearch = async (req, res) => {
    const search = req.query.search;
    const page = parseInt(req.query.page) || 1; // Add this line
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit; // Corrected skip calculation

    try {
        const flights = await Flight.find({ departure_airport_code: new RegExp(search, 'i') }) // Search implementation
            .skip(skip)
            .limit(limit);
        res.json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllFlight = async (req, res) => {
    try {
        var flight = await Flight.find({});
        res.json(flight);
    }   catch (err) {
        res.status(500).json({ message: err.message});
    }

}
