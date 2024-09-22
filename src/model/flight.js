const mongoose=require('mongoose');

const flightSchema= {
    flight_id:Number,
    flight_number:Number,
    departure_airport_code:String,
    arrival_airport_code:String,
    departure_date:Date,
    arrival_time:Date,
    flight_duration_hours:Number,
}

const flight = mongoose.model('flight',flightSchema)
module.exports = flight;