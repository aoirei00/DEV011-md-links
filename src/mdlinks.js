const fs = require('fs/promises');
const path = require('path');
const {
  linkExtractor,
  linkValidator,
  validMarkdownFile,
  printLinkInfo,
} = require('./fileUtils');


function mdLinks(filePath, validate = false) {
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
        if (!validate) {
          // Si no se requiere validación, simplemente resolvemos con los enlaces.
          resolve(links.map((link) => ({
            href: link.href,
            text: link.text,
            file: absolutePath,
          })));
        } else {
          // Si se requiere validación, vamos a validar cada enlace.
          const linkValidationPromises = links.map((link) => linkValidator(link));

          // Utilizamos Promise.all para esperar a que todas las validaciones se completen.
          Promise.all(linkValidationPromises)
            .then((validatedLinks) => {
              resolve(validatedLinks.map((link) => ({
                href: link.href,
                text: link.text,
                file: absolutePath,
                status: link.status,
                ok: link.ok,
              })));
            })
            .catch((validationError) => {
              reject(validationError);
            });
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

/*
mdLinks('src/pruebaFormatoCorrecto.md', true)
  .then((links) => {
    console.log('Enlaces encontrados:');
    links.forEach((link, index) => printLinkInfo(link, index));
  })
  .catch((error) => {
    console.error('Error:', error);
  });
*/
module.exports = mdLinks;