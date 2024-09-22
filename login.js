const jwt = require("jsonwebtoken");

const getUser = async (username) => {
    return {userId: 123, password: "123456", username };
};

module.exports = async (req, res) => {
    const { username, password } = req.body;

    const user = await getUser(username);

    if (user.passowrd !== password) {
        return res.status(403).json({
            error: "invalid login",
        });
    }

    delete user.password;

    const token = jwt.sign(user, process.env.MY_SECRET, { expiresIn: "1h"});

    res.cookie("token", token, {
        httOnly: true,

    });

    return res.redirect("/index");
}