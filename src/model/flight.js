const mongoose=require('mongoose');

const flightSchema= new mongoose.Schema({
    flight_number: { type: Number, required: true, unique: true },
    departure_airport_code: { type: String, required: true },
    arrival_airport_code: { type: String, required: true },
    departure_date: { type: Date, required: true },
    arrival_time: { type: Date, required: true },
    flight_duration_hours: { type: Number, required: true },
}, {collection: 'flights'});

const flight = mongoose.model('Flight',flightSchema)
module.exports = flight;