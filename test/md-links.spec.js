const mdLinks = require('../index');
const {
  linkExtractor,
  linkValidator,
  validMarkdownFile,
  printLinkInfo,
  calculateStats,
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

describe('linkExtractor', () => {
  it('debería extraer los enlaces correctamente', () => {
    const content = 'Este es un enlace [Github](https://github.com/aoirei00) y este es otro [Markdown](https://markdown.es/).';

    const links = linkExtractor(content);

    expect(links).toEqual([
      { text: 'Github', href: 'https://github.com/aoirei00'},
      { text: 'Markdown', href: 'https://markdown.es/' },
    ]);
  });
}),

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

  describe('calculateStats', () => {
    it('debería calcular el total de los enlaces, el total de enlaces únicos y el total de enlaces rotos', () => {
      
      const links = [
        { href: 'https://github.com/aoirei00', text: 'Github', file: 'src/pruebaFormatoCorrecto.md', ok: 'ok' },
        { href: 'https://markdown.es/', text: 'Markdown', file: 'src/pruebaFormatoCorrecto.md', ok: 'ok' },
        { href: 'https://markdown.es/', text: 'Markdown', file: 'src/pruebaFormatoCorrecto.md', ok: 'fail' },
        { href: 'https://unapaginaquenoexiste.mx', text: 'Inexistente', file: 'src/pruebaFormatoCorrecto.md', ok: 'fail' },
      ];
  
      // Calculamos las estadísticas
      const stats = calculateStats(links);
  
      // Verificamos que las estadísticas sean correctas
      expect(stats).toEqual({ total: 4, unique: 3, ok: 2, fail: 2 });
    });
  });


