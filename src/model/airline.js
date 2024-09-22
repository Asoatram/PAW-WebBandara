const mongoose = require('mongooose');

const airlineSchema = {
    name : String,
    iata_code: String,
    icao_code: String,
}

const airline = mongoose.model('airline', airlineSchema)
module.exports = airline;