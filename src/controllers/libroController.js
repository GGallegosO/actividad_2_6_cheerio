/**
 * libroController.js
 * Controlador de extracción de datos del catálogo de la biblioteca.
 * Responsabilidad: recibir requests, invocar servicios y responder JSON.
 */

import { obtenerLibros as extraerLibros } from '../services/libroService.js';

/**
 * GET /api/libros
 * Retorna todos los libros del catálogo.
 */
export const obtenerLibros = async (req, res) => {
  try {
    const libros = await extraerLibros();

    res.json({
      exito: true,
      total: libros.length,
      datos: libros,
    });
  } catch (error) {
    console.error(`[ERROR] obtenerLibros: ${error.message}`);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al extraer los libros.',
      detalle: error.message,
    });
  }
};

/**
 * GET /api/libros/disponibles
 * Retorna solo los libros con stock disponible.
 */
export const obtenerLibrosDisponibles = async (req, res) => {
  try {
    const todos = await extraerLibros();
    // Filtramos directamente los que están disponibles
    const disponibles = todos.filter((l) => l.estado === 'disponible');

    res.json({
      exito: true,
      total: disponibles.length,
      datos: disponibles,
    });
  } catch (error) {
    console.error(`[ERROR] obtenerLibrosDisponibles: ${error.message}`);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al filtrar libros disponibles.',
      detalle: error.message,
    });
  }
};

/**
 * GET /api/libros/categoria/:categoria
 * Retorna libros filtrados por categoría.
 */
export const obtenerLibrosPorCategoria = async (req, res) => {
  const { categoria } = req.params;

  // Validación básica del parámetro (Error 400)
  if (!categoria || typeof categoria !== 'string') {
    return res.status(400).json({
      exito: false,
      mensaje: 'El parámetro categoría es inválido.',
    });
  }

  try {
    const todos = await extraerLibros();
    const filtrados = todos.filter(
      (l) => l.categoria.toLowerCase() === categoria.toLowerCase()
    );

    // Si la categoría no existe en el catálogo (Error 404)
    if (filtrados.length === 0) {
      return res.status(404).json({
        exito: false,
        mensaje: `No se encontraron libros para la categoría: "${categoria}".`,
      });
    }

    // Respuesta exitosa
    res.json({
      exito: true,
      categoria,
      total: filtrados.length,
      datos: filtrados,
    });
  } catch (error) {
    console.error(`[ERROR] obtenerLibrosPorCategoria: ${error.message}`);
    res.status(500).json({
      exito: false,
      mensaje: 'Error al filtrar por categoría.',
      detalle: error.message,
    });
  }
};