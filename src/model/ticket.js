const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_id: {type: Number, require: false},
    flight_number: {type: Number, default: 1000},
    origin: String, 
    destination: String, 
    name: String, 
    seat_number: String, 
    class: String, 
    price: {type: Number, default: 0},
    purchase_date: {type : Date, require:false},
});

const Ticket = mongoose.model('tickets', ticketSchema);
module.exports = Ticket;
