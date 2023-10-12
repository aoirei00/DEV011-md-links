const fs = require('fs/promises');
const path = require('path');
const {
  linkExtractor,
  linkValidator,
  validMarkdownFile,
  calculateStats,
} = require('./src/fileUtils');


function mdLinks(filePath, options = { validate: false, stats: false }) {//Usaremos un objeto options para mantener una estructura de datos mas clara
  const absolutePath = path.resolve(filePath);//Esta linea convierte la ruta a absoluta con el metodo path.resolve para que pueda funcionar en todos los modulos de manera futura.

  return new Promise((resolve, reject) => {//Creamos una promesa que resuelva la lectura del archivo y que extraiga los enlaces contenidos
    fs.readFile(absolutePath, 'utf-8')//Utilizamos el metodo readFile para leer el contenido de los archivos.
      .then((content) => {
        if (!validMarkdownFile(absolutePath)) {
          // Si no es válido, rechazamos la promesa con un error.
          reject(new Error('El archivo no tiene un formato Markdown valido'));
          return;
        }

        const links = linkExtractor(content);//Extraemos los enlaces dentro del contenido del archivo md con nuestra funcion importada de linkExtractor.

        if (options.validate && options.stats) {
          // Validación y estadísticas
          const linkValidationPromises = links.map((link) => linkValidator(link));

          Promise.all(linkValidationPromises)
            .then((validatedLinks) => {
              const stats = calculateStats(validatedLinks);
              resolve(stats);
            })
            .catch((validationError) => {
              reject(validationError);
            });
        } else if (options.validate) {
          // Solo validación
          const linkValidationPromises = links.map((link) => linkValidator(link));

          Promise.all(linkValidationPromises)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((validationError) => {
              reject(validationError);
            });
        } else if (options.stats) {
          // Solo estadísticas
          const stats = calculateStats(links);
          resolve(stats);
        } else {
          // Sin validación ni estadísticas
          resolve(links.map((link) => ({
            href: link.href,
            text: link.text,
            file: absolutePath,
          })));
        }
      })
      .catch((error) => {
        if (error.code === 'ENOENT') {
          reject(new Error('La ruta del archivo es incorrecta o no existe.'));
        } else {
          reject(error);
        }
      });
  });
}


module.exports = mdLinks;