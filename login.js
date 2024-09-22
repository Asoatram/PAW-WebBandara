const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // Gantilah dengan URI MongoDB yang benar
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getUser = async (email) => {
    try {
        await client.connect();
        const database = client.db("WebBandara"); // Nama database sesuai dengan yang terlihat pada gambar
        const collection = database.collection("User"); // Nama koleksi yang terlihat pada gambar

        // Mencari user berdasarkan email
        const user = await collection.findOne({ email: email });
        return user;
    } finally {
        await client.close();
    }
};

module.exports = async (req, res) => {
    const { email, password } = req.body;

    // Ambil data user berdasarkan email
    const user = await getUser(email);

    if (!user || user.password !== password) {
        return res.status(403).json({
            error: "invalid login",
        });
    }

    // Hapus password dari objek user sebelum membuat token
    delete user.password;

    // Buat token JWT dengan payload user
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.MY_SECRET, { expiresIn: "1h" });

    // Set cookie dengan token
    res.cookie("token", token, {
        httpOnly: true,
    });

    return res.redirect("/index");
};
