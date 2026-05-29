import express from 'express';
import sequelize from './database.js';
import pelicula from './pelicula.js';

const app = express();
app.use(express.json());

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

// Captura dinámica del puerto de Render o usa el 3000 local
const PORT = process.env.PORT || 3000;

// Envolvemos la inicialización en una función para que Render no falle
async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log(' Conexión con PostgreSQL establecida correctamente.');
    
    await sequelize.sync(); // Crea la tabla en la nube si no existe
    console.log(' Modelos sincronizados.');

    // Aquí usamos la constante PORT con la variable corregida
    app.listen(PORT, () => console.log(`🚀 API lista y escuchando en el puerto ${PORT}`));
    
  } catch (error) {
    console.error(' Error al inicializar la base de datos:', error);
  }
}

iniciarServidor();
