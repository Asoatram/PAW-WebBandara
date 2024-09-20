const express = require('express');
const path = require('path');

const app = express();
const port = 3001;





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get('/',function (req, res) {

});