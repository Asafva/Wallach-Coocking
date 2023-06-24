const express = require("express");
const app = express();
var cors = require('cors');


const Product = require("./models/productModel");
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Test')
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);
        res.status(200).json(product)
        if (!product) {
            return res.status(404).json({ message: `cannot find ID:${id}` });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        console.log(req.body)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})


app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
        return res.status(404).json({ message: `cannot find ID:${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct)
}
)


app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find ID:${id}` });
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})


mongoose.connect('mongodb+srv://63blueday63:123456admin@asafapi.9sp6cwk.mongodb.net/node-API')
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(3000, () => {
            console.log("Server is running...")
        });
    }).catch((error) => {
        console.log(error.message)
    });

