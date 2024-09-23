const express = require('express');
const path = require('path');
const fs = require('fs')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const flightRoutes = require('./src/routes/flightRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');

dotenv.config();

const app = express();
const port = 3001;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Is connected to the server,"))
    .catch(err => console.log(err));

app.use('/', ticketRoutes)
app.use('/', flightRoutes);

function serveFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(404).send('File not found!');
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', contentType);
            res.send(data);
        }
    });
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/flight', (req, res) => {
    const fileName = req.params.page;
    const filePath = path.join(__dirname, 'public/flight', `getflight.html`);
    serveFile(filePath, res);
});

app.get('/flight/post', (req, res) => {
    const fileName = req.params.page;
    const filePath = path.join(__dirname, 'public/flight', `post${fileName}.html`);
    serveFile(filePath, res);
});

app.use((req,res) => {
    res.status(404).send('<h1>Not Found</h1>');
})
