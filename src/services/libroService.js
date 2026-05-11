import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

/**
 * Función encargada exclusivamente de la extracción de datos (Responsabilidad Única).
 * Recibe el texto crudo del HTML y devuelve un arreglo de objetos JSON.
 */
const extraerDatosDeHtml = (html) => {
    // 1. Cargamos el texto en Cheerio para crear el DOM virtual
    const $ = cheerio.load(html);
    const libros = [];

    // 2. Bucle: Iteramos estrictamente sobre cada elemento que tenga la clase .libro
    $('.libro').each((i, el) => {
        
        // Extraemos atributos ocultos en la etiqueta principal del libro
        const id = parseInt($(el).attr('data-id'), 10);
        const categoria = $(el).attr('data-categoria');

        // Extraemos el texto limpio de etiquetas simples
        const titulo = $(el).find('.titulo').text().trim();
        const autor = $(el).find('.autor').text().trim();

        // Extraemos texto y "borramos" los prefijos innecesarios usando replace()
        const isbn = $(el).find('.isbn').text().replace('ISBN:', '').trim();
        const anio = parseInt($(el).find('.anio').text().replace('Año:', '').trim(), 10);
        const editorial = $(el).find('.editorial').text().replace('Editorial:', '').trim();
        
        // Extraemos el estado (lo pasamos a minúsculas por seguridad) y la ubicación
        const estado = $(el).find('.estado').text().trim().toLowerCase();
        const ubicacion = $(el).find('.ubicacion').text().trim();

        // 3. Empaquetamos todo en un objeto y lo metemos a la lista
        libros.push({
            id,
            categoria,
            titulo,
            autor,
            isbn,
            anio,
            editorial,
            estado,
            ubicacion
        });
    });

    // 4. Devolvemos la lista completa al controlador
    return libros;
};

/**
 * Función principal que exportamos al controlador.
 * Se encarga de leer el archivo físico y manejar los errores.
 */
export const obtenerLibros = async () => {
    try {
        // Buscamos el archivo catalogo.html en la carpeta public
        const rutaHTML = path.join(process.cwd(), 'public', 'catalogo.html');
        const htmlCrudo = await fs.readFile(rutaHTML, 'utf-8');
        
        // Validación de seguridad: si el HTML está vacío o fue borrado accidentalmente
        if (!htmlCrudo || htmlCrudo.trim() === '') {
            throw new Error('El archivo HTML base está vacío o es inválido.');
        }

        // Si el archivo está bien, delegamos el trabajo pesado a la función extractora
        return extraerDatosDeHtml(htmlCrudo);
        
    } catch (error) {
        // Si falla la lectura del archivo o el escrapeo, lanzamos el error hacia arriba
        throw new Error(`Error al procesar el catálogo: ${error.message}`);
    }
};
