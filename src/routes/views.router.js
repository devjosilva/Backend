import express from 'express';
import Product from '../models/product.model.js'; 
import Carts from '../models/cart.model.js'; 
const router = express.Router();

// Ruta para la vista home.handlebars
router.get('/home', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('home', { products, title: 'Home' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar los productos.' });
    }
});

// Ruta para la vista carts.handlebars
router.get('/carts', async (req, res) => {
    try {
        const carts = await Carts.find();
        res.render('carts', { carts, title: 'Carts' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar carritos.' });
    }
});

// Ruta para la vista realTimeProducts.handlebars
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('realTimeProducts', { products, title: 'Real-Time Products' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar los productos en tiempo real.' });
    }
});

export default router;
