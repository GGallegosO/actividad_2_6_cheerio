/**
 * src/controllers/libroController.js
 */

// Endpoint 1: Obtener todos los libros
export const obtenerLibros = async (req, res, next) => {
  try {
    res.json({ exito: true, mensaje: "¡Ruta de todos los libros conectada!" });
  } catch (error) {
    next(error); // Esto envía el error a nuestro manejador global en app.js
  }
};

// Endpoint 2: Obtener solo los disponibles
export const obtenerLibrosDisponibles = async (req, res, next) => {
  try {
    res.json({ exito: true, mensaje: "¡Ruta de libros disponibles conectada!" });
  } catch (error) {
    next(error);
  }
};

// Endpoint 3: Filtrar por categoría
export const obtenerLibrosPorCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.params; // Extraemos la categoría de la URL
    res.json({ exito: true, mensaje: `¡Ruta conectada! Buscando categoría: ${categoria}` });
  } catch (error) {
    next(error);
  }
};
