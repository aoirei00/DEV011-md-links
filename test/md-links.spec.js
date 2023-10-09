const mdLinks = require('../src/mdlinks');
const {
  linkExtractor,
  linkValidator,
  validMarkdownFile,
  printLinkInfo,
} = require('../src/fileUtils');

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
  it('se rechaza la promesa cuando el formato del archivo no es Markdown', () => {
    return expect(mdLinks('src/invalidFile.txt')).rejects.toThrow('La ruta del archivo es incorrecta o no existe.');
  });
  
 it('se rechaza la promesa cuando la ruta del archivo es invalida', () => {
    return expect(mdLinks('src/nonExistentFile.md')).rejects.toThrow('La ruta del archivo es incorrecta o no existe.');
  });
});

describe ('linkValidator',() =>{
  it('deberia resolver el estatus del los links contenidos en los archivos',() =>{
   
    const validLink = {
      href: 'https://github.com/' ,
    };

    return linkValidator(validLink);

    expect(result.status).toBe(200);
    expect(result.ok).toBe('ok');
  });

  it('debe validar el status de un link inexistente a "fail"', () => {
    const invalidLink = {
      href: 'https://nonexistentwebsite12345.com',
    };

    return linkValidator(invalidLink);

    expect(result.status).toBe('N/A');
    expect(result.ok).toBe('fail');
  });
    

  });



