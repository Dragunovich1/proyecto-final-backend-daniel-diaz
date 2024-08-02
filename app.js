const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const { getProductsForView } = require('./controllers/productController');
const handlebarsHelpers = require('./handlebarsHelpers'); // Importar los helpers de Handlebars

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/base_de_datos', {
    serverSelectionTimeoutMS: 30000, // Aumentar el tiempo de espera a 30 segundos
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Configuración de Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: handlebarsHelpers, // Registrar los helpers de Handlebars
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Configurar middleware de sesión
app.use(session({
    secret: 'tu_secreto_de_sesion', // Cambia esto a un valor seguro
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejar WebSockets
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Middleware para manejar PUT y DELETE desde formularios
app.use(methodOverride('_method'));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Ruta para vista index.handlebars
app.get('/', getProductsForView);
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { title: 'Dashboard', products, cartId: req.session.cartId });
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});

// Ruta para vista realTimeProducts.handlebars
app.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products, showDashboardLink: true });
    } catch (error) {
        res.status(500).send('Error al obtener los productos');
    }
});

// Ruta para vista carts.handlebars
app.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        res.render('carts', { title: 'Carrito', cart, cartId: req.session.cartId, showDashboardLink: true });
    } catch (error) {
        res.status(500).send('Error al obtener el carrito');
    }
});

// Ruta para vista product.handlebars
app.get('/products/:pid', async (req, res) => {
    try {
        const product = await Product.findById(req.params.pid);
        if (product) {
            res.render('product', { product, cartId: req.session.cartId, showDashboardLink: true });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Manejo de conexiones WebSocket
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
