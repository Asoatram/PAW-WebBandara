const mongoose = require('mongoose');

const airportSchema = {
    airport_code: String,
    airport_name: String,
    country_code: String,
    city_code: String,
}

const airport = mongoose.model('airport', airportSchema)
module.exports = airport;