const fs = require('fs');

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
        links.push(link);//Con ayuda de .push almacenamos el objeto link dentro de nuestro arreglo links 

    };
    return links;
}



module.exports = linkExtractor;