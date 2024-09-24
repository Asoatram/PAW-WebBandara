const express = require('express');
const Ticket = require('../model/ticket'); // Ganti dengan path yang sesuai
const router = express.Router();

// Create a new ticket
router.post('/api/tickets/post', async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all tickets
router.get('/api/tickets/get', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a ticket by ID
router.get('/api/tickets/get/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a ticket by ID
router.patch('/api/tickets/update/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a ticket by ID
router.delete('/api/tickets/delete/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).send();
        }
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/api/ticket/get", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5; // Define the number of records per page
        const skip = (page - 1) * limit;

        // Extract query parameters for filtering
        const {name, origin, destination} = req.query;

        // Initialize the query object
        let query = {};

        // Apply filters only if values are provided
        if (name) {
            query.name = new RegExp(name, "i"); // "i" makes it case-insensitive
        }

        if (origin) {
            query.origin = new RegExp(origin, "i");  // Exact match for origin
        }

        if (destination) {
            query.destination = new RegExp(destination, "i");  // Exact match for destination
        }

        // Fetch the filtered tickets from the database, with pagination
        const tickets = await Ticket.find(query).skip(skip).limit(limit);
        const totalTickets = await Ticket.countDocuments(query);

        // Determine if there is a next page
        const hasNextPage = totalTickets > skip + limit ? 1 : 0;

        if (tickets.length === 0) {
            return res.status(404).send({ message: "No tickets found", hasNextPage });
        }

        // Return the tickets and pagination info
        res.status(200).send({ tickets, hasNextPage });
    } catch (error) {
        res.status(500).send({ error: "Server Error", details: error.message });
    }
});

module.exports = router;
