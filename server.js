require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    console.log("I am health api");
    res.json({service: "Backend Pro Manage API Server",
        status: "active",
        time: new Date()
    });
})

app.use("/api/v1/auth", authRoute);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!"})
})

mongoose
    .connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("DB Connected!");
        })
        .catch((error) => {
            console.log("DB failed to connect", error);
        })


const PORT = 4002;

app.listen(PORT, () => {
    console.log(`Backend Server listening at port: ${PORT}`);
});