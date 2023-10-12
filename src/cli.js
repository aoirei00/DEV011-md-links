#!/usr/bin/env node

const { program } = require('commander');
const mdLinks = require('../index');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

// Encabezado "MD-Links" con Figlet
console.log(chalk.green(figlet.textSync('MD-Links', { horizontalLayout: 'full' })));

program
  .version('1.0.0')
  .description('Encuentra y valida enlaces en archivos Markdown')
  .arguments('<path>')
  .option('--validate', 'Validar los enlaces')
  .option('--stats', 'Mostrar estadísticas')
  .action((path, options) => {
    const { validate, stats } = options;

    // Usar inquirer para preguntar al usuario algo
    if (!path) {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'path',
            message: 'Introduce la ruta del archivo o directorio:',
            validate: function (value) {
              if (value.length) {
                return true;
              } else {
                return 'Por favor, introduce una ruta válida.';
              }
            },
          },
        ])
        .then((answers) => {
          mdLinks(answers.path, { validate, stats }).then((results) => {
            if (stats && validate) {
              console.log(`Total: ${results.total}`);
              console.log(`Únicos: ${results.unique}`);
              console.log(`Rotos: ${results.fail}`);
            } else if (stats) {
              console.log(`Total: ${results.total}`);
              console.log(`Únicos: ${results.unique}`);
            } else {
              results.forEach((link) => {
                console.log(`URL: ${chalk.blue(link.href)}`);
                console.log(`Texto: ${chalk.magenta(truncateText(link.text, 50))}`);
                console.log(`Archivo: ${chalk.cyan(link.file)}`);
                if (validate) {
                  console.log(`Estado: ${link.ok} (${link.status})`);
                }
                console.log('---');
              });
            }
          }).catch((error) => {
            console.error(error);
          });
        });
    } else {
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
            console.log(`URL: ${chalk.blue(link.href)}`);
            console.log(`Texto: ${chalk.magenta(truncateText(link.text, 50))}`);
            console.log(`Archivo: ${chalk.cyan(link.file)}`);
            if (validate) {
              console.log(`Estado: ${link.ok} (${link.status})`);
            }
            console.log('---');
          });
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  })
  .parse(process.argv);

// Función para truncar el texto
function truncateText(texto, longitudMaxima) {
  if (texto.length <= longitudMaxima) {
    return texto; // Si el texto ya es más corto o igual a la longitud máxima, no se trunca.
  } else {
    return texto.slice(0, longitudMaxima) + '...'; // Se toman los primeros 50 caracteres y se agrega "..." para indicar que se ha truncado.
  }
}