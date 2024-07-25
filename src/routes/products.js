import express from 'express';
import { Router } from 'express';
import { readFile, writeFile } from '../utils/fileUtils.js';
import { PRODUCTS_FILE } from '../utils/config.js';

//const productsFilePath = 'products.json';
const router = express.Router();

const productsRouter = (io) => {
    
    // Ruta para listar todos los productos
    router.get('/', async (req, res) => {
        try {
            const products = await readFile(PRODUCTS_FILE);
            const limit = 1 //req.query.limit ? parseInt(req.query.limit) : products.length;
            res.json(products.slice(0, limit));
        } catch (error) {
            res.status(500).json({ error: `Error al leer el archivo ${PRODUCTS_FILE} en products  ` });
        }
    });

    // Ruta para obtener un producto por ID
    router.get('/:pid', async (req, res) => {
        try {
            const products = await readFile(PRODUCTS_FILE);
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

    // Ruta para agregar un nuevo producto
    router.post('/', async (req, res) => {
        const { title, description, code, price, status, stock, category, thumbnails = [] } = req.body;

        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos excepto thumbnails son obligatorios' });
        }    
        try {
            //const newProduct = req.body;
            //newProduct.id = products.length ? String(products.length + 1) : '1';
            //const newStatus = newProduct.status !== undefined ? newProduct.status : true;
            const products = await readFile(PRODUCTS_FILE);
            //Sugerencia de Agustín preEntrega1
            const newId  = products.length > 0 ? parseInt(products[products.length - 1].id) + 1 : 1;
            const newProduct = {
                id: newId.toString(),
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            };        
            products.push(newProduct);
            await writeFile(PRODUCTS_FILE, products);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Error crear producto' });
        }
    });

    // Ruta para actualizar un producto por ID
    router.put('/:pid', async (req, res) => {
        const { title, description, code, price, status, stock, category, thumbnails = [] } = req.body;

        if (!title || !description || !code || !price || !status || !stock || !category) {
            return res.status(400).json({ error: 'Todos los campos excepto thumbnails son obligatorios' });
        }    
        try {
            const products = await readFile(PRODUCTS_FILE);
            const productIndex = products.findIndex(p => p.id === req.params.pid);
            if (productIndex !== -1) {
                //const updatedProduct = { ...products[productIndex], ...req.body };
                const updatedProduct = { ...products[productIndex], title, description, code, price, status, stock, category };
                //Se actualiza el campo thumbnails solo si está presente en el cuerpo de la solicitud.
                if (thumbnails) {
                    updatedProduct.thumbnails = thumbnails;
                }
                if (req.body.id) delete req.body.id;
                products[productIndex] = updatedProduct;
                await writeFile(PRODUCTS_FILE, products);
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
            const products = await readFile(PRODUCTS_FILE);
            const productIndex = products.findIndex(p => p.id === req.params.pid);
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await writeFile(PRODUCTS_FILE, products);
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
