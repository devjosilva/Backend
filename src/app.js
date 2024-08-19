import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/views.router.js'; 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js'; 
import Cart from './models/cart.model.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Especifica la ruta del archivo .env
// Carga variables de entorno
dotenv.config({ path: path.resolve(__dirname, './.env') });

//const port = 8090;
const port = process.env.PORT || 8090

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

const environment = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado a la base")
    }).catch(error => {
        console.log("error", error)
    });
};

environment();

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
  }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/products', productsRouter(io)); // Pasa 'io' al router
app.use('/api/carts', cartsRouter(io)); // Pasa 'io' al router
app.use('/', viewsRouter);  // Usa el nuevo router para las vistas

// WebSocket connection
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    
    socket.on('newProduct', async (productData) => {
        try {
            const newProduct = new Product(productData);
            await newProduct.save();
            const products = await Product.find();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    });

    socket.on('deleteProduct', async (id) => {
        try {
            await Product.findByIdAndDelete(id);
            const products = await Product.find();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al borrar producto:', error);
        }
    });

    socket.on('newCart', async () => {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            const carts = await Cart.find().populate('products.product');
            io.emit('updateCarts', carts);
        } catch (error) {
            console.error('Error al crear carrito:', error);
        }
    });

    socket.on('addProductToCart', async ({ cartId, productId }) => {
        try {
            const cart = await Cart.findById(cartId);
            if (cart) {
                const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += 1;
                } else {
                    cart.products.push({ product: productId, quantity: 1 });
                }
                await cart.save();
                const updatedCart = await Cart.findById(cartId).populate('products.product');
                io.emit('updateCart', updatedCart);
            }
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    });
});

// Servidor escuchando
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
