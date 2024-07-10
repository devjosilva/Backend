const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../utils/fileUtils');

const cartsFilePath = 'carts.json';

router.post('/', async (req, res) => {
    try {
        const carts = await readFile(cartsFilePath);
        const newCart = { id: carts.length ? String(carts.length + 1) : '1', products: [] };
        carts.push(newCart);
        await writeFile(cartsFilePath, carts);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear carro de compras.' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const carts = await readFile(cartsFilePath);
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

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const carts = await readFile(cartsFilePath);
        const cart = carts.find(c => c.id === req.params.cid);
        if (cart) {
            const productIndex = cart.products.findIndex(p => p.product === req.params.pid);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: req.params.pid, quantity: 1 });
            }
            await writeFile(cartsFilePath, carts);
            res.status(201).json(cart);
        } else {
            res.status(404).json({ error: 'Carro de compras no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar carro de compras.' });
    }
});

module.exports = router;
