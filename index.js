import express from 'express';
import sequelize  from './database.js';
import pelicula from './node_modules/pelicula.js';

const app = express();
app.use(express.json());

// Inicialización asíncrona de la base de datos
try {
await sequelize.authenticate();
console.log('Conexión con PostgreSQL establecida correctamente.');
await sequelize.sync(); // Crea la tabla en la nube si no existe
} catch (error) {
console.error('Error al inicializar la base de datos:', error);
}

// --- ENDPOINTS SOLICITADOS ---
app.get('/peliculas', async (req, res) => {
const pelicula = await pelicula.findAll();
res.json(pelicula);
});
app.get('/peliculas/:id', async (req, res) => {
const venta = await pelicula.findByPk(req.params.id);
venta ? res.json(pelicula) : res.status(404).json({ error: 'No encontrado' });
});
app.post('/pelicula', async (req, res) => {
const nuevapelicula = await pelicula.create(req.body);
res.status(201).json(nuevapelicula);
});
// Captura dinámica del puerto de Render
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT | 3001, () => console.log('API lista en http://localhost:3000'));