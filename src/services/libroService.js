/**
 * src/services/libroService.js
 */
import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Armamos la ruta exacta donde está guardado el HTML del catálogo
const rutaHTML = path.join(__dirname, '../../public/catalogo.html');

export const extraerLibros = async () => {
  try {
    // 1. Leemos el archivo físico completo
    const htmlCrudo = await fs.readFile(rutaHTML, 'utf-8');

    // 2. Cargamos el texto en Cheerio
    const $ = cheerio.load(htmlCrudo);

    const libros = [];

    // 3. LA MAGIA DE CHEERIO:
    // Le decimos a $: "Busca todas las etiquetas que tengan la clase '.libro'. 
    // Luego, haz un ciclo (.each) y ejecuta esta función por cada una que encuentres."
    $('.libro').each((index, elemento) => {
      
      // $(elemento) representa el "div" del libro actual en el ciclo.
      // .attr() extrae atributos ocultos en la etiqueta HTML (como data-id)
      const id = parseInt($(elemento).attr('data-id'));
      const categoria = $(elemento).attr('data-categoria');

      // .find() busca hacia adentro del div actual por una clase específica.
      // .text() extrae el texto visible entre las etiquetas.
      // .trim() limpia los espacios en blanco sobrantes a los lados.
      const titulo = $(elemento).find('.titulo').text().trim();
      const autor = $(elemento).find('.autor').text().trim();
      
      // Como el texto viene como "ISBN: 978-...", usamos .replace() de JavaScript 
      // para borrar la palabra "ISBN: " y quedarnos solo con el número limpio.
      const isbn = $(elemento).find('.isbn').text().replace('ISBN: ', '').trim();
      const anio = parseInt($(elemento).find('.anio').text().replace('Año: ', '').trim());
      const editorial = $(elemento).find('.editorial').text().replace('Editorial: ', '').trim();
      
      // En la pauta de ejemplo, el estado ("disponible") viene en minúsculas. 
      // Por eso agregamos .toLowerCase()
      const estado = $(elemento).find('.estado').text().trim().toLowerCase();
      const ubicacion = $(elemento).find('.ubicacion').text().trim();

      // Armamos un objeto JavaScript ordenado con los datos extraídos
      const libroExtraido = {
        id,
        categoria,
        titulo,
        autor,
        isbn,
        anio,
        editorial,
        estado,
        ubicacion
      };

      // Guardamos este libro en nuestro arreglo principal
      libros.push(libroExtraido);
    });

    return libros; // Devolvemos la lista completa ya procesada

  } catch (error) {
    console.error("Error al procesar el HTML con Cheerio:", error);
    throw new Error("No se pudo procesar el catálogo de la biblioteca");
  }
};
