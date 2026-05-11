/**
 * app.js
 * Punto de entrada principal del servidor de la Biblioteca.
 * Responsabilidad: Configurar Express, registrar rutas y encender el servidor.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import libroRoutes from './src/routes/libroRoutes.js';

// Configuración para obtener la ruta del directorio actual en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// 1. Configuración de archivos estáticos (Carpeta public)
// Esto permite que el archivo catalogo.html sea accesible desde el servidor [cite: 276, 667]
app.use(express.static(path.join(__dirname, 'public')));

// 2. Ruta para ver la maqueta original directamente
app.get('/maqueta', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'catalogo.html'));
});

// 3. Menú de bienvenida en la raíz (la salida que vimos en el navegador)
app.get('/', (req, res) => {
    res.json({
        nombre: "API Biblioteca Universitaria - Actividad 2.6",
        version: "1.0.0",
        descripcion: "Servicio de extracción de datos mediante Cheerio",
        endpoints: {
            todosLosLibros: "GET /api/libros",
            librosDisponibles: "GET /api/libros/disponibles",
            librosPorCategoria: "GET /api/libros/categoria/:categoria",
            maquetaOriginal: "GET /maqueta"
        }
    });
});

// 4. Registro de las rutas de la API bajo el prefijo /api [cite: 446, 674]
app.use('/api', libroRoutes);

// 5. Encendido del servidor con la salida estilizada
app.listen(PORT, () => {
    console.log(`
─────────────────────────────────────
  Servidor Biblioteca corriendo en:
  http://localhost:3000
  Catálogo: http://localhost:3000/maqueta
─────────────────────────────────────`);
});
