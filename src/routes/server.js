const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const loginRoute = require("./routes/login");
const addRoute = require("./routes/add");
const { cookieJwtAuth } = require("./middleware/cookieJwtAuth");
const PORT = 3001;

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/welcome", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/welcome.html"));
});

app.post("/login", loginRoute);
app.post("/add", cookieJwtAuth, addRoute);

app.listen(PORT, () => {
    console.log('Example app listening at http://localhost:${PORT}');
});