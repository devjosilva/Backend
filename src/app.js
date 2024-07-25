import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import { readFile, writeFile } from './utils/fileUtils.js';
import { PRODUCTS_FILE, CARTS_FILE } from './utils/config.js';

// Define helper functions
const handlebarsInstance = handlebars.create();
handlebarsInstance.handlebars.registerHelper('extend', function(name, options) {
    if (!this._blocks) this._blocks = {};
    this._blocks[name] = options.fn(this);
    return null;
});

handlebarsInstance.handlebars.registerHelper('block', function(name) {
    return (this._blocks && this._blocks[name]) ? this._blocks[name] : null;
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 8090

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos


// Configuración de Handlebars
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/products', productsRouter(io)); // Pasa 'io' al router
app.use('/api/carts', cartsRouter(io)); // Pasa 'io' al router

// Rutas para vistas
app.get('/home', async (req, res) => {
    const products = await readFile(PRODUCTS_FILE);
    res.render('home', { products, title: 'Home' });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await readFile(PRODUCTS_FILE);
    res.render('realTimeProducts', { products, title: 'Real-Time Products' });
});

// WebSocket connection
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    socket.on('newProduct', async (product) => {
        const products = await readFile(PRODUCTS_FILE);
        const newId = products.length > 0 ? parseInt(products[products.length - 1].id) + 1 : 1;
        product.id = newId.toString();
        products.push(product);
        await writeFile(PRODUCTS_FILE, products);
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', async (id) => {
        let products = await readFile(PRODUCTS_FILE);
        products = products.filter(p => p.id !== id);
        await writeFile(PRODUCTS_FILE, products);
        io.emit('updateProducts', products);
    });
});

// Servidor escuchando
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

