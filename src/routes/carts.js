import express from 'express';
import Cart from '../models/cart.model.js'; 
import Product from '../models/product.model.js'; 

const router = express.Router();

const cartsRouter = (io) => {

    // Ruta para listar todos los carritos
    router.get('/', async (req, res) => {
        try {
            const carts = await Cart.find().populate('products.product');
            //res.render('carts', { carts, title: 'Carritos de Compras' });
            res.json(carts);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los carritos' });
        }
    });

    // Ruta para listar carrito por id
    router.get('/:cid', async (req, res) => {
        try {
            const cart = await Cart.findById(req.params.cid).populate('products.product');
            if (cart) {
                res.json(cart.products);
            } else {
                res.status(404).json({ error: 'Carro de compras no encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al cargar carro de compras.' });
        }
    });

    // Ruta para crear carrito
    router.post('/', async (req, res) => {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear carro de compras.' });
        }
    });

    // Ruta para agregar producto a un carrito por Id
    router.post('/:cid/product/:pid', async (req, res) => {
        try {
            const cart = await Cart.findById(req.params.cid);
            if (cart) {
                const product = await Product.findById(req.params.pid);
                if (!product) {
                    return res.status(404).json({ error: 'Producto no encontrado.' });
                }

                const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += 1;
                } else {
                    cart.products.push({ product: req.params.pid, quantity: 1 });
                }
                await cart.save();
                res.status(201).json(cart);
            } else {
                res.status(404).json({ error: 'Carro de compras no encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar carro de compras.' });
        }
    });

    return router;
};

export default cartsRouter;
