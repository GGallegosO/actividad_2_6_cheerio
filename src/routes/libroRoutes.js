/**
 * src/routes/libroRoutes.js
 */
import express from 'express';
import { 
  obtenerLibros, 
  obtenerLibrosDisponibles, 
  obtenerLibrosPorCategoria 
} from '../controllers/libroController.js'; // Ojo: en ES Modules es obligatorio poner el .js al final

const router = express.Router();

// Definimos los tres endpoints obligatorios que exige el Problema 2
router.get('/libros', obtenerLibros);
router.get('/libros/disponibles', obtenerLibrosDisponibles);
router.get('/libros/categoria/:categoria', obtenerLibrosPorCategoria);

export default router;
