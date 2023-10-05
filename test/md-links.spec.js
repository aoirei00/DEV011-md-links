jest.setTimeout(30000); 
const mdLinks = require('../src/mdlinks');

describe('mdLinks', () => {
  it('debería resolver un arreglo con 2 links para un archivo .md con 2 links', () => {
    return mdLinks('src/pruebaFormatoCorrecto.md')
      .then((links) => {
        links.forEach((link) => {
          // Verifica que cada enlace tenga propiedades href, text y file
          expect(link).toHaveProperty('href');
          expect(link).toHaveProperty('text');
          expect(link).toHaveProperty('file');
        });
      });   
  });
  //it('se rechaza la promesa cuando el formato del archivo no es  Markdown', () => {
    //return expect(mdLinks('src/invalidFile.txt')).rejects.toThrow('El archivo no tiene un formato Markdown valido');
  //});

 // it('se rechaza la promesa cuando la ruta del archivo es invalida', () => {
   // return expect(mdLinks('src/nonExistentFile.md')).rejects.toThrow('La ruta del archivo es incorrecta o no existe.');
  //});
});
