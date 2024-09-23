const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_id: Number, 
    flight_number: Number,
    origin: String, 
    destination: String, 
    name: String, 
    seat_number: String, 
    class: String, 
    price: Number, 
    purchase_date: Date,
});

const Ticket = mongoose.model('tickets', ticketSchema);
module.exports = Ticket;
