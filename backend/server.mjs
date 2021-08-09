// import { createRequire } from "module";
// const express = require('express'); 
import  express from 'express';
import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.mjs';
import userRouter from './routers/userRouter.mjs';
import orderRouter from './routers/orderRouter.mjs';
// const data = require("./data");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona2021', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(res=>{
    console.log("DB Connected!")
}).catch(err => {
console.log(Error, err.message);
});

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if (product) {
//         res.send(product);
//     }
//     else {
//         res.status(404).send({ message: 'Product not Found' });
//     }
// });

// app.get('/api/products', (req, res) => {
//     res.send(data.products);
// });

app.use('/api/users',userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

// app.listen(5000, () => {
//     console.log('Server at http://localhost:5000');
// });
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});