import express from 'express';
import Product from '../models/product.model.js';

const router = express.Router();

const productsRouter = (io) => {
    
    // Ruta para listar todos los productos con paginación
    router.get('/', async (req, res) => {
        try {
            const page = req.query.page ? parseInt(req.query.page) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit) : 10;
            const options = {
                page,
                limit
            };
            const products = await Product.paginate({}, options);
            res.json({
                docs: products.docs,
                totalDocs: products.totalDocs,
                limit: products.limit,
                totalPages: products.totalPages,
                page: products.page,
                pagingCounter: products.pagingCounter,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    });

    // Ruta para obtener un producto por ID
    router.get('/:pid', async (req, res) => {
        try {
            const product = await Product.findById(req.params.pid);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ error: 'Producto no encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener producto.' });
        }
    });

    // Ruta para agregar un nuevo producto
    router.post('/', async (req, res) => {
        const { title, description, code, price, status, stock, category, thumbnails = [] } = req.body;

        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos excepto thumbnails son obligatorios' });
        }    
        try {
            const newProduct = new Product({
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            });
            await newProduct.save();
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear producto' });
        }
    });

    // Ruta para actualizar un producto por ID
    router.put('/:pid', async (req, res) => {
        const { title, description, code, price, status, stock, category, thumbnails = [] } = req.body;

        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos excepto thumbnails son obligatorios' });
        }    
        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.pid,
                { title, description, code, price, status, stock, category, thumbnails },
                { new: true }
            );
            if (updatedProduct) {
                res.json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Producto no encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar producto.' });
        }
    });

    // Ruta para eliminar un producto por ID
    router.delete('/:pid', async (req, res) => {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
            if (deletedProduct) {
                res.status(204).end();
            } else {
                res.status(404).json({ error: 'Producto no encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al borrar producto.' });
        }
    });

    return router;
};

export default productsRouter;
