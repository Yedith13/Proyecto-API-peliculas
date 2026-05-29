import express from 'express';
import sequelize  from './database.js';
import pelicula from './pelicula.js';

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
const peliculas = await pelicula.findAll();
res.json(peliculas);
});

app.get('/peliculas/:id', async (req, res) => {
const peliculas = await pelicula.findByPk(req.params.id);
peliculas ? res.json(peliculas) : res.status(404).json({ error: 'No encontrado' });
});

app.post('/pelicula', async (req, res) => {
const nuevaspeliculas = await pelicula.create(req.body);
res.status(201).json(nuevaspeliculas);
});

app.put('/peliculas/:id', async (req, res) => {
  try {
    // Buscamos la película por el ID que viene en la URL
    const peliEncontrada = await pelicula.findByPk(req.params.id);

    if (peliEncontrada) {
      // Actualizamos directamente la película que encontramos usando los datos del body
      await peliEncontrada.update(req.body);
      
      // Devolvemos la película con sus datos ya modificados
      res.json(peliEncontrada);
    } else {
      res.status(404).json({ error: 'Película no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la película', detalle: error.message });
  }
});

app.delete('/peliculas/:id', async (req, res) => {
const borrado = await pelicula.destroy({ where: { id: req.params.id } });
res.json({ eliminado: !!borrado });
});

// Captura dinámica del puerto de Render
const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, () => console.log('API lista en http://localhost:3000'));

await sequelize.sync({ force: true }); // <-- Ponlo con "force: true" para que cree la tabla en Render
