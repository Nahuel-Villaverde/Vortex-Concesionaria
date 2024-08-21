import express from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.config.js';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from './routes/productRoutes.js';
import sessionsRouter from './routes/session.js';
import cartRouter from './routes/carts.api.js';
/* import productViewsRouter from './routes/views/product.views.router.js'; */
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
  }),
  cookie: {
    secure: false, // Cambia a `true` si usas HTTPS
    httpOnly: true,
    sameSite: 'lax' // Ajusta según tus necesidades
  }
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL)
  .then(() => console.log('Conectado a la base de datos'))
  .catch(error => console.error('Error en la conexión', error));

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'No autorizado' }); // Enviar respuesta 401 si no está autenticado
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRouter);
/* app.use('/', productViewsRouter); */

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});