const express = require('express');
const Ticket = require('./models/Ticket'); // Ganti dengan path yang sesuai
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

module.exports = router;
