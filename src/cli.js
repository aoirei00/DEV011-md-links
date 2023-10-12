#!/usr/bin/env node

const { program } = require('commander');
const mdLinks = require('../index');

const program = require('commander');
const mdLinks = require('tu-funcion-md-links'); // Reemplaza con la ruta correcta

program
  .version('1.0.0')
  .description('Encuentra y valida enlaces en archivos Markdown')
  .arguments('<path>')
  .option('--validate', 'Validar los enlaces')
  .option('--stats', 'Mostrar estadísticas')
  .action((path, options) => {
    const { validate, stats } = options;
    mdLinks(path, { validate, stats }).then((results) => {
      if (stats && validate) {
        console.log(`Total: ${results.total}`);
        console.log(`Únicos: ${results.unique}`);
        console.log(`Rotos: ${results.fail}`);
      } else if (stats) {
        console.log(`Total: ${results.total}`);
        console.log(`Únicos: ${results.unique}`);
      } else {
        results.forEach((link) => {
          console.log(`URL: ${link.href}`);
          console.log(`Texto: ${truncateText(link.text, 50)}`); // Truncar el texto a 50 caracteres
          console.log(`Archivo: ${link.file}`);
          if (validate) {
            console.log(`Estado: ${link.ok} (${link.status})`);
          }
          console.log('---');
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  })
  .parse(process.argv);