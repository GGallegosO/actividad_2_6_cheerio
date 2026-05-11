/**
 * libroRoutes.js
 * Definición de rutas para la API de la Biblioteca IP Santo Tomás.
 * Responsabilidad: mapear URLs a los controladores de libros.
 */

import { Router } from 'express';
import {
  obtenerLibros,
  obtenerLibrosDisponibles,
  obtenerLibrosPorCategoria
} from '../controllers/libroController.js';

const router = Router();

// ──────────────────────────────────────────
// Rutas de Libros (Biblioteca)
// ──────────────────────────────────────────

/** * GET /api/libros
 * Obtener todos los libros del catálogo 
 */
router.get('/libros', obtenerLibros);

/** * GET /api/libros/disponibles
 * Obtener solo libros con estado "disponible" 
 */
router.get('/libros/disponibles', obtenerLibrosDisponibles);

/** * GET /api/libros/categoria/:categoria
 * Obtener libros filtrados por categoría 
 */
router.get('/libros/categoria/:categoria', obtenerLibrosPorCategoria);

export default router;
