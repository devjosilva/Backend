const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../utils/fileUtils');

const productsFilePath = 'products.json';

router.get('/', async (req, res) => {
    try {
        const products = await readFile(productsFilePath);
        const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
        res.json(products.slice(0, limit));
    } catch (error) {
        res.status(500).json({ error: 'Error al obetener productos.' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const products = await readFile(productsFilePath);
        const product = products.find(p => p.id === req.params.pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener producto.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const products = await readFile(productsFilePath);
        newProduct.id = products.length ? String(products.length + 1) : '1';
        newProduct.status = newProduct.status !== undefined ? newProduct.status : true;
        products.push(newProduct);
        await writeFile(productsFilePath, products);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error crear producto' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const products = await readFile(productsFilePath);
        const productIndex = products.findIndex(p => p.id === req.params.pid);
        if (productIndex !== -1) {
            const updatedProduct = { ...products[productIndex], ...req.body };
            if (req.body.id) delete req.body.id;
            products[productIndex] = updatedProduct;
            await writeFile(productsFilePath, products);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto.' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const products = await readFile(productsFilePath);
        const productIndex = products.findIndex(p => p.id === req.params.pid);
        if (productIndex !== -1) {
            products.splice(productIndex, 1);
            await writeFile(productsFilePath, products);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al borrar producto.' });
    }
});

module.exports = router;
