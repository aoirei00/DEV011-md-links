const fs = require('fs/promises');
const path = require('path');
const linkExtractor = require('./linkExtractor');

//const filePath; //'src/pruebaFomatoCorrecto.docx' //'C:/Users/jas_b/OneDrive/Documentos/DEV011-md-links/src/pruebaFormatoCorrecto.md';
function mdLinks(filePath) {
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

        const formattedLinks = links.map((link) => ({//Damos formato a los links 
          href: link.href,
          text: link.text,
          file: absolutePath,
        }));
        return resolve(formattedLinks); // si no hay errores y el formato es el correcto se resuelve la promesa
      })
      .catch((error) => {
        if (error.code === 'ENOENT') {
          // El archivo no existe, rechazamos la promesa con un mensaje personalizado.
          throw new Error('La ruta del archivo es incorrecta o no existe.');
        }
        throw error; // Otras excepciones las relanzamos para manejarlas más adelante.
      });
  });
}

function validMarkdownFile(filePath) {//Creamos una funcion para validar las extensiones de markdown

  const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  const extname = path.extname(filePath); //Utilizamos path para extraer el nombre de la extencion de filePath
  return validExtensions.includes(extname);//Nos retorna el nombre de la extencion con el metodo extname que nos devuelve el nombre despues del ultimo punto de la ruta
}

mdLinks('src/pruebaFormatoCorrecto.md')
  .then((links) => {
    console.log('Enlaces encontrados:');
    links.forEach((link, index) => console.log(`Enlace ${index + 1}: URL (href): ${link.href}, Texto (text): ${link.text}, Archivo (file): ${link.file}`)); //
  })
  .catch((error) => {
    console.error('Error:', error);
  });


module.exports = mdLinks;