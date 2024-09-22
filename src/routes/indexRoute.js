const express = require('express');
const public = require('public');

const router = express.Router();

router.get('/', (req, res) => {
    res.use(express.static(__dirname + '/public'));
})

router.get('/signin', (req, res) => {
    res.sendFile(__dirname + '/public/signup/signin.html');

})

router.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup/signup.html');
})
module.exports = router;