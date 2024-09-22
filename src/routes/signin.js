const express = require("express");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser"); // Pastikan untuk bisa menangani form-data

const app = express();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware untuk parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Fungsi untuk mengambil user berdasarkan email
const getUser = async (email) => {
    try {
        await client.connect();
        const database = client.db("WebBandara"); // Gantilah sesuai nama database
        const collection = database.collection("User");

        // Mencari user berdasarkan email
        const user = await collection.findOne({ email: email });
        return user;
    } finally {
        await client.close();
    }
};

// Endpoint untuk proses sign-in
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;  // Mengambil data dari form

    // Ambil data user berdasarkan email
    const user = await getUser(email);

    // Jika user tidak ditemukan atau password tidak cocok
    if (!user || user.password !== password) {
        return res.status(403).json({
            error: "Invalid login",
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

    // Redirect ke halaman dashboard atau index setelah login berhasil
    return res.redirect("/index"); 
});

// Jalankan server
app.listen(3001, () => {
    console.log("Server running on port 3001");
});
