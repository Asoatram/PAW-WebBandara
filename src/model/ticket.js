const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_id: { type: Number, required: true },
    flight_number: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    name: { type: String, required: true },
    seat_number: { type: String, required: true },
    class: { type: String, required: true },
    price: { type: Number, required: true },
    purchase_date: { type: Date, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
