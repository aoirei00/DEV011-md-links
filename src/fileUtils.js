const fs = require('fs');
const path = require('path');
//---------------------------Función para extraer links de los archivos----------------------------//
function linkExtractor(content) {
    const regExpLinks = /\[([^\]]+)\]\(([^)]+)\)/g;//Esta expresion regular nos servira para encontrar las coincidencias de links

    let links = [];//Se inicializa un arreglo donde vamos a almacenar los links

    let match;//Inicializamos  match donde mas tarde se van a asignar las coincidencias de la expresion regular 

    while ((match = regExpLinks.exec(content)) !== null) {//Utilizamos un bucle while para que se realice una iteracion mientras haya councidencias con la expresion regular
        //con la ayuda del metodo exec() si se encuentra una coincidencia, exec devuelve un objeto que contiene información sobre la coincidencia.
        let link = {                                              //si en la iteracion mientras match no sea igual a null seguira ejecutandose, si no se encuentran mas coincidencias este se detiene.
            text: match[1],//Si se encuentan coincidencias se crea un objeto link que contiene los valores del texto del link y el atributo href.
            href: match[2],

        };
        links.push(link);//Con ayuda de el metodo .push almacenamos el objeto link dentro de nuestro arreglo links 

    };
    return links;
}
//---------------------------Función para validar los links de los archivos----------------------------//
function linkValidator(link) {
    return new Promise((resolve) => {//Creamos unanueva promesa que se va a resolver una vez que se valide el link
        fetch(link.href)//Utilizamos fetch para para hacer una solicitud http al link.href 
            .then((response) => {
                link.status = response.status;
                link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';//Definimos que es el rango de estado de respuesta si la peticion, 
                resolve(link);// si se encuentra entre un rango de 200 a 399 te manda la respuesta ok si se encuentra arriba de 400 marca error y manda respuesra fail
            })
            .catch(() => {
                link.status = 'N/A';
                link.ok = 'fail';
                resolve(link);
            });
    });
}
//---------------------------Función para validar que el formato es md----------------------------//
function validMarkdownFile(filePath) {//Creamos una funcion para validar las extensiones de markdown

    const validExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    const extname = path.extname(filePath); //Utilizamos path para extraer el nombre de la extencion de filePath
    return validExtensions.includes(extname);//Nos retorna el nombre de la extencion con el metodo extname que nos devuelve el nombre despues del ultimo punto de la ruta
}

//---------------------------Función stats para contabilizar el total de enlaces y los enlaces unicos  ----------------------------//
  function calculateStats(links) {
    const totalLinks = links.length;
    const uniqueLinks = new Set(links.map(link => link.href)).size;
    const brokenLinks = links.filter(link => link.ok === 'fail').length;

  return { total: totalLinks, unique: uniqueLinks, ok: totalLinks - brokenLinks, fail: brokenLinks };
  }
  
  

  module.exports = {
    linkExtractor,
    linkValidator,
    validMarkdownFile,
    calculateStats,
  };

  