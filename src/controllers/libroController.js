/**
 * src/controllers/libroController.js
 */
import { extraerLibros } from '../services/libroService.js';

// Endpoint 1: Obtener todos los libros
export const obtenerLibros = async (req, res, next) => {
  try {
    const libros = await extraerLibros(); // Llamamos al servicio de Cheerio
    
    res.json({
      exito: true,
      total: libros.length,
      datos: libros
    });
  } catch (error) {
    next(error);
  }
};

// Endpoint 2: Obtener solo los disponibles 
export const obtenerLibrosDisponibles = async (req, res, next) => {
  try {
    const todosLosLibros = await extraerLibros();
    
    // Filtramos el arreglo buscando solo los que tengan estado 'disponible'
    const disponibles = todosLosLibros.filter(l => l.estado === 'disponible');

    res.json({
      exito: true,
      total: disponibles.length,
      datos: disponibles
    });
  } catch (error) {
    next(error);
  }
};

// Endpoint 3: Filtrar por categoría 
export const obtenerLibrosPorCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const todosLosLibros = await extraerLibros();

    // Filtramos por la categoría recibida en la URL
    const filtrados = todosLosLibros.filter(l => l.categoria === categoria.toLowerCase());

    // Validación: Si no hay libros en esa categoría, enviamos error 404 
    if (filtrados.length === 0) {
      return res.status(404).json({
        exito: false,
        mensaje: `No se encontraron libros para la categoría: "${categoria}"`
      });
    }

    res.json({
      exito: true,
      categoria: categoria,
      total: filtrados.length,
      datos: filtrados
    });
  } catch (error) {
    next(error);
  }
};
