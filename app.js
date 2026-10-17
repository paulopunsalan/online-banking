require('dotenv').config();

const { secret } = process.env;

const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
const PORT = 3000;

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());
app.use(express.static("public"));

app.use(session({
    secret: secret || "fallback",
    resave: false,
    saveUninitialized: false,
}));

app.set("view engine", "ejs");

app.use("/", authRoutes);
app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);

app.listen(PORT, () => {
    if (!secret) {
        console.warn(`Using fallback secret; please set up your .env file with .env.example!`)
    }
    console.log(`Online Banking App running at http://localhost:${PORT}/`);
});