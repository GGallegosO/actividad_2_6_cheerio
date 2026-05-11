# API Biblioteca Universitaria - Actividad 2.6

Este proyecto consiste en el desarrollo de un servicio de extracción de datos (Web Scraping) que transforma un catálogo de libros legacy en formato HTML en una API REST estructurada utilizando **Node.js**, **Express** y **Cheerio**.

## 1. Objetivo
El objetivo principal es demostrar la capacidad de procesar información no estructurada desde el servidor, aplicando una arquitectura de software organizada por capas (Rutas, Controladores y Servicios) para garantizar la escalabilidad y el mantenimiento del código.

## 2. Instalación

Para replicar este entorno en un laboratorio local o servidor Linux, siga estos pasos:

```bash
# 1. Clonar el repositorio
git clone <tu-url-de-github>
```
# 2. Entrar a la carpeta del proyecto
```bash
cd actividad_2_6_cheerio
```
# 3. Instalar dependencias
```bash
# Nota: El proyecto incluye un 'override' en package.json para asegurar 
# la compatibilidad de la librería 'undici' con versiones de Node.js 18+.
npm install
```
## 3. Ejecución
Para iniciar el servicio en el puerto 3000:
```bash
# Iniciar servidor
node app.js
```
El servidor desplegará una consola con los enlaces directos para las pruebas.

## 4. Endpoints de la API
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/libros` | Retorna el catálogo completo con los 8 libros extraídos. |
| **GET** | `/api/libros/disponibles` | Filtra y retorna solo libros con estado "disponible". |
| **GET** | `/api/libros/categoria/:categoria` | Retorna libros pertenecientes a una categoría específica. |
| **GET** | `/maqueta` | Permite visualizar el archivo HTML original de la biblioteca. |

## 5. Ejemplos de Request y Response

### Petición: `GET /api/libros/disponibles`

**Response (JSON):**
```json
{
  "exito": true,
  "total": 5,
  "datos": [
    {
      "id": 1,
      "categoria": "programacion",
      "titulo": "Introducción a los Algoritmos",
      "autor": "Thomas H. Cormen",
      "isbn": "978-0-262-03384-8",
      "anio": 2022,
      "editorial": "MIT Press",
      "estado": "disponible",
      "ubicacion": "Estante A-12"
    },
    {
      "id": 3,
      "categoria": "base-de-datos",
      "titulo": "Fundamentos de Bases de Datos",
      "autor": "Abraham Silberschatz",
      "isbn": "978-0-07-352332-3",
      "anio": 2019,
      "editorial": "McGraw-Hill",
      "estado": "disponible",
      "ubicacion": "Estante B-03"
    }
  ]
}
```
## 6. Documentación Técnica (Cumplimiento de Requerimientos)

### Extracción de Datos y Manipulación del DOM (Cheerio)
Para el cumplimiento del requerimiento de scraping, se implementó una lógica de consulta al DOM en el archivo `libroService.js` utilizando los siguientes métodos de **Cheerio**:
* **Carga del DOM:** `cheerio.load(html)` para transformar el string crudo en un objeto consultable.
* **Selección y Recorrido:** Uso de `$('.libro').each()` para iterar sobre cada contenedor de libro de forma independiente.
* **Extracción de Atributos:** Uso de `.attr('data-id')` y `.attr('data-categoria')` para obtener metadatos no visibles en el texto.
* **Limpieza de Datos:** Implementación de `.replace()` y `.trim()` para sanitizar los campos, eliminando prefijos como "ISBN:" o "Año:" antes de convertir a tipos de datos numéricos.

### Arquitectura de Software y Manejo de Errores
El proyecto sigue el patrón de diseño de **Separación de Capas**, lo que permite un manejo de errores granulares y respuestas HTTP normalizadas:

1.  **Validación de Entrada (Error 400):** El controlador valida que los parámetros de ruta (como `:categoria`) existan y sean válidos antes de procesar la solicitud.
2.  **Manejo de Recursos No Encontrados (Error 404):** Si el proceso de filtrado resulta en un arreglo vacío, se retorna un estado 404 con un mensaje descriptivo para el cliente.
3.  **Gestión de Excepciones del Servidor (Error 500):** Se utiliza una estructura `try-catch` global por endpoint. Esto captura errores críticos, como la ausencia del archivo `catalogo.html` o fallos en el sistema de archivos (`fs`), evitando que el servidor se detenga.
4.  **Validación de Integridad:** Se incluyó una verificación para asegurar que el archivo HTML no esté vacío antes de iniciar el parseo, cumpliendo con los estándares de seguridad básicos.


