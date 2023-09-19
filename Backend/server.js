const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {

    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


app.get('/', (req, res) => { res.send('Database is Working...') })
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

