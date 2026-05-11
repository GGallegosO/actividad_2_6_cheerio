/**
 * app.js
 * Punto de entrada principal para el Catálogo de la Biblioteca IP Santo Tomás.
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// Importaremos nuestras rutas de libros en el siguiente bloque
import libroRoutes from './src/routes/libroRoutes.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Carpeta para el catálogo estático
app.use(express.static(join(__dirname, 'public'))); 

// ──────────────────────────────────────────
// Rutas de la API (Libros)
// ──────────────────────────────────────────
app.use('/api', libroRoutes);

// Ruta raíz - Información de la API de la Biblioteca
app.get('/', (req, res) => {
  res.json({
    nombre:    'API Biblioteca Universitaria - Actividad 2.6',
    version:   '1.0.0',
    descripcion: 'Servicio de extracción de datos mediante Cheerio',
    endpoints: {
      todosLosLibros:      'GET /api/libros',
      librosDisponibles:   'GET /api/libros/disponibles',
      librosPorCategoria:  'GET /api/libros/categoria/:categoria',
      maquetaOriginal:     'GET /maqueta',
    },
  });
});

// Ruta para ver el catálogo HTML legacy directamente [cite: 65]
app.get('/maqueta', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'catalogo.html'));
});

// Middleware: 404
app.use((req, res) => {
  res.status(404).json({
    exito:   false,
    mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

// Middleware: Manejo global de errores [cite: 75]
app.use((error, req, res, _next) => {
  console.error(`[ERROR] ${error.message}`);
  res.status(500).json({
    exito:   false,
    mensaje: 'Error interno del servidor.',
    detalle: error.message,
  });
});

app.listen(PORT, () => {
  console.log('─────────────────────────────────────');
  console.log(`  Servidor Biblioteca corriendo en:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`  Catálogo: http://localhost:${PORT}/maqueta`);
  console.log('─────────────────────────────────────');
});