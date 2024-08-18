/*
Poblar datos en:
db e-commerce
colecciones carts y products 

Ejecutar:
node populate.js

*/

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Cart from './cart.model.js';
import Product from './product.model.js';

// Convierte import.meta.url a una ruta de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Especifica la ruta del archivo .env
// Carga variables de entoro
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const productsData = [
    {
        _id: new mongoose.Types.ObjectId(), // You can generate ObjectId manually for later reference in carts
        title: "Smartphone",
        description: "Latest model with all new features",
        code: "SP001",
        price: 699.99,
        status: true,
        stock: 50,
        category: "Electronics",
        thumbnails: ["img/smartphone1.png", "img/smartphone2.png"]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Laptop",
        description: "Powerful laptop for all your needs",
        code: "LP001",
        price: 1299.99,
        status: true,
        stock: 30,
        category: "Computers",
        thumbnails: ["img/laptop1.png", "img/laptop2.png"]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Headphones",
        description: "Noise-cancelling over-ear headphones",
        code: "HP001",
        price: 199.99,
        status: true,
        stock: 100,
        category: "Accessories",
        thumbnails: ["img/headphones1.png"]
    }
];

const cartsData = [
    {
        id:1,
        products: [
            {
                product: productsData[0]._id, // Referencing the first product
                quantity: 2
            },
            {
                product: productsData[2]._id, // Referencing the third product
                quantity: 1
            }
        ]
    },
    {
        id:2,
        products: [
            {
                product: productsData[1]._id, // Referencing the second product
                quantity: 1
            }
        ]
    }
];

const populateDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');

        // Clear existing data
        await Product.deleteMany({});
        await Cart.deleteMany({});

        // Insert products
        const products = await Product.insertMany(productsData);
        console.log('Products added:', products);

        // Insert carts
        const carts = await Cart.insertMany(cartsData);
        console.log('Carts added:', carts);

        mongoose.disconnect();
    } catch (err) {
        console.error('Error populating the database:', err);
        mongoose.disconnect();
    }
};

populateDB();
