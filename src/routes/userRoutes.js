const express = require('express');
const User = require('../model/User'); // Ganti dengan path yang sesuai
const router = express.Router();
const jwt = require('jsonwebtoken')

// Create a new user
router.post('/api/user/post', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all users
router.get('/api/user/get', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users)
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a user by ID
router.get('/api/user/get/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a user by ID
router.patch('/api/user/update/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a user by ID
router.delete('/api/user/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

const getUser =    

router.post('/api/login', async (req, res) => {
    const Useremail = req.body.email;
    try {

        const users = await User.findOne({"email" :  Useremail}).exec();
        const user = { "email": Useremail}

        const AccessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn :"24h"})
        console.log(AccessToken)
        res.cookie("token", AccessToken);
        res.status(200).json({AccessToken: AccessToken});
    } catch (error) {
        res.status(500).send(error);
    }
}); 

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

        
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user

    })
}



module.exports = router;
