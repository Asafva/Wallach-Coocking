const express = require("express");
const app = express();
var cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get('/', (req, res) => { res.send('Data is Working...') })
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));


mongoose.connect('mongodb+srv://63blueday63:123456admin@asafapi.9sp6cwk.mongodb.net/node-API')
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        })
    }).catch((error) => {
        console.log(error.message)
    });

