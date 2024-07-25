import express from 'express';
import { Router } from 'express';
import { readFile, writeFile } from '../utils/fileUtils.js';
import { CARTS_FILE, PRODUCTS_FILE } from '../utils/config.js';

//const cartsFilePath = 'carts.json';
const router = express.Router();

const cartsRouter = (io) => {

    // Ruta para listar carrito por id
    router.get('/:cid', async (req, res) => {
        try {
            const carts = await readFile(CARTS_FILE);
            const cart = carts.find(c => c.id === req.params.cid);
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
            const carts = await readFile(CARTS_FILE);
            const newId  = carts.length > 0 ? parseInt(carts[carts.length - 1].id) + 1 : 1;
            //const newCart = { id: carts.length ? String(carts.length + 1) : '1', products: [] };
            const newCart = { id: newId, products: [] };
            carts.push(newCart);
            await writeFile(CARTS_FILE, carts);
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear carro de compras.' });
        }
    });

    // Ruta para agregar producto a un carrito por Id
    router.post('/:cid/product/:pid', async (req, res) => {
        try {
            const carts = await readFile(CARTS_FILE);
            const cart = carts.find(c => c.id === req.params.cid);
            if (cart) {
                const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += 1;
                } else {
                    cart.products.push({ product: req.params.pid, quantity: 1 });
                }
                await writeFile(CARTS_FILE, carts);
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
