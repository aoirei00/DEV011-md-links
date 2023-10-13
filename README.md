# Markdown Links

## Índice

* [1. Descripción de libreria](#1-Descripción-de-libreria)
* [2. Instalación](#2-Instalación)
* [3. Uso](#3-Uso)
* [4. Detalles Adicionales](#4-Detalles-Adicionales)
*
***

## 1. Descripción de libreria

`mdLinks` es una herramienta de línea de comandos que te permite analizar enlaces contenidos en archivos Markdown   (.md). Puedes utilizarlo para encontrar enlaces, validar su estado y obtener estadísticas sobre los enlaces en tus archivos Markdown.


## 2. Instalación

Para instalar `mdLinks`, asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu sistema. Luego, ejecuta el siguiente comando en tu terminal:

```shell
`npm i jbf-md-links`
```

## 3. Uso

Una vez que md-links esté instalado, puedes usarlo desde la línea de comandos. Aquí hay algunos ejemplos de cómo usarlo:

### Encontrar enlaces en un archivo Markdown

```shell
`md-links ruta-de-tu-archivo`
```
Este comando buscará todos los enlaces en el archivo "archivo.md" y mostrará sus URLs, texto y el archivo donde se encuentran.

### Validar enlaces en un archivo Markdown

```shell
`md-links ruta-de-tu-archivo` --validate
```
demás de mostrar la información de los enlaces, este comando verificará el estado de cada enlace y mostrará si están rotos (404) o si están en buen estado.

### Mostrar estadísticas de enlaces

```shell
`md-links ruta-de-tu-archivo` --stats
```
Este comando mostrará estadísticas sobre los enlaces encontrados en el archivo, incluyendo el número total de enlaces y el número de enlaces únicos.

### Combinar validación y estadísticas

Puedes combinar las opciones para validar enlaces y mostrar estadísticas al mismo tiempo:

```shell
`md-links ruta-de-tu-archivo` --validate --stats
```

## 4. Detalles Adicionales 

### Disponible en GitHub

MD-Links no solo es una librería útil, sino que también está disponible como un módulo publicado en GitHub. Puedes encontrar el repositorio oficial en [GitHub](https://github.com/aoirei00/DEV011-md-links), donde puedes explorar el código fuente, revisar las actualizaciones y contribuir al desarrollo.

### Licencia
Este proyecto se distribuye bajo la licencia [ISC](https://opensource.org/licenses/ISC). Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

### Ayúdanos a Mejorar

Si encuentras errores o deseas contribuir al desarrollo de MD-Links, ¡estamos abiertos a colaboraciones! Visita nuestra página de [Issues en GitHub](https://github.com/aoirei00/DEV011-md-links/issues) para reportar problemas o sugerir mejoras.

