const campoOrigen = document.getElementById("origen");
const campoDestino = document.getElementById("desti");
const campoAdultos = document.getElementById("adults");
const campoInfants = document.getElementById("infants");
const campoFechaInicio = document.getElementById("dataInici");
const campoFechaFin = document.getElementById("dataFi");

const arrayElementos = [campoOrigen, campoDestino, campoAdultos, campoInfants, campoFechaInicio, campoFechaFin];
const etiquetaElementos = ["origen", "destino", "adultos", "infants", "fechainicio", "fechafin"];

const serializer = new XMLSerializer();
const parser = new DOMParser();

var isJSON = false;
var isFirst = true;


//TODO: terminar la función
function cercarDisponibilitat() {
    if (!validateCampos()) {
        alert("Tienes un campo vacío o la fecha errónea!");
        return
    }
    crearXmlBusqueda();
    mostrarHoteles();
    mostrarVuelos();
}

function convertir() {
    var dataDoc = document.getElementById("disponibilitat");
    if(!dataDoc && !isFirst){
        document.getElementById("conversio").textContent = "No se ha encontrado el XML disponibilitat.xml!";
        return;
    }
    if (isFirst) {
        let jsonSerializado = '[{';
        let resultado = null;
        
        let xmlDoc = parser.parseFromString(dataDoc.textContent, 'application/xml');
        let busquedas = xmlDoc.getElementsByTagName('busqueda');
        for (let i = 0; i < busquedas.length; i++) {
            let busqueda = busquedas[i];
            for(let i = 0; i < arrayElementos.length; i++){
                let nodoValue = busqueda.getElementsByTagName(etiquetaElementos[i])[0].textContent;
                let nodoNombre = etiquetaElementos[i];
                jsonSerializado += `"${nodoNombre}": "${nodoValue}"`
                if (i < arrayElementos.length-1){
                    jsonSerializado += ",";
                }
                jsonSerializado += '\n';
            }
            if (i < busquedas.length-1){
                jsonSerializado += ",";
            } else{
                jsonSerializado += "}]";
            }
        }
        resultado = JSON.parse(jsonSerializado);
        document.getElementById("conversio").textContent = JSON.stringify(resultado, null, 2);
        isJSON = true;
        isFirst = false;
        return;
    }
    if(isJSON){
        let jsonStringified = document.getElementById("conversio").textContent;
        let jsonDoc = JSON.parse(jsonStringified);      
        let xmlString = '<busquedas>\n';
        jsonDoc.forEach(busqueda => {
        xmlString += `  <busqueda>\n`;
            xmlString += `      <origen>${busqueda.origen}</origen>\n`;
            xmlString += `      <destino>${busqueda.destino}</destino>\n`;
            xmlString += `      <adultos>${busqueda.adultos}</adultos>\n`;
            xmlString += `      <infants>${busqueda.infants}</infants>\n`;
            xmlString += `      <fechainicio>${busqueda.fechainicio}</fechainicio>\n`;
            xmlString += `      <fechafin>${busqueda.fechafin}</fechafin>\n`;
            xmlString += `  </busqueda>\n`
        });
        xmlString += ` </busquedas>\n`;
        document.getElementById("conversio").textContent = xmlString;
        isJSON = false;
    }
    else{
        let xmlDoc = parser.parseFromString(document.getElementById("conversio").textContent, "application/xml");
        let busquedas = xmlDoc.getElementsByTagName("busqueda");
        let jsonSerializado = [];

        for (let i = 0; i < busquedas.length; i++) {
            let busqueda = busquedas[i];
            let obj = {
                origen: busqueda.getElementsByTagName("origen")[0]?.textContent || "",
                destino: busqueda.getElementsByTagName("destino")[0]?.textContent || "",
                adultos: busqueda.getElementsByTagName("adultos")[0]?.textContent || "",
                infants: busqueda.getElementsByTagName("infants")[0]?.textContent || "",
                fechainicio: busqueda.getElementsByTagName("fechainicio")[0]?.textContent || "",
                fechafin: busqueda.getElementsByTagName("fechafin")[0]?.textContent || ""
            };
            jsonSerializado.push(obj);
        }
    document.getElementById("conversio").textContent = JSON.stringify(jsonSerializado, null, 2);
    isJSON = true;
    }
}

function validateCampos() {
    return campoOrigen.value !== '' &&
        campoDestino.value !== '' &&
        campoAdultos.value !== '' &&
        campoInfants.value !== '' &&
        campoFechaInicio.value !== '' &&
        campoFechaFin.value !== '' &&
        campoFechaFin.value >= campoFechaInicio.value;
}

function crearXmlBusqueda() {
    document.getElementById("disponibilitat").textContent = '';
    let xmlString = "<busquedas></busquedas>"
    let xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const root = xmlDoc.getElementsByTagName("busquedas")[0];
    let nodo = xmlDoc.createElement("busqueda");
    root.appendChild(nodo);
    for (let i = 0; i < arrayElementos.length; i++) {
        let atributo = xmlDoc.createElement(etiquetaElementos[i]);
        atributo.textContent = arrayElementos[i].value
        nodo.appendChild(atributo);
    }
    let xmlSerializado = serializer.serializeToString(xmlDoc);
    document.getElementById("disponibilitat").textContent = formateoXML(xmlSerializado);
}

function mostrarHoteles() {
    document.getElementById("resultatsHotels").textContent = '';
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let xmlDoc = this.responseXML;
            let xmlString = "";
            Array.from(xmlDoc.getElementsByTagName("desti")).forEach(nodo => {
                if (nodo.childNodes[0].nodeValue == campoDestino.value) {
                    xmlString += serializer.serializeToString(nodo.parentNode);
                }  
            });
            document.getElementById("resultatsHotels").textContent = xmlString;
        }
    };
    xhttp.open("GET", "hotels.xml", true);
    xhttp.send();
}

function mostrarVuelos() {
    document.getElementById("resultatsVols").textContent = '';
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        let vuelos = JSON.parse(this.responseText);
        let resultado = "";
        for (let vuelo of vuelos) {
            if (vuelo.origen == campoOrigen.value && vuelo.desti == campoDestino.value) {
                resultado += `Origen: ${vuelo.origen} hacia destino: ${vuelo.desti} con Precio: ${vuelo.preu}\n`;
            }
        }
        document.getElementById("resultatsVols").textContent = resultado || "No se encontraron vuelos.";

    };
    xmlhttp.open("GET", "vols.json");
    xmlhttp.send();
}

function formateoXML(xmlString) {
    const padding = "  ";
    const regEx = /(>)(<)(\/*)/g;
    let formateado = "";
    let pad = 0;
    xmlString = xmlString.replace(regEx, "$1\n$2$3");
    const lineas = xmlString.split("\n");
    lineas.forEach((linea) => {
        let lineaTrim = linea.trim();
        if (lineaTrim.startsWith("</")) {
            pad = Math.max(pad - 1, 0);
        }
        formateado += padding.repeat(pad) + linea + "\n";
        if (
            lineaTrim.startsWith("<") &&
            !lineaTrim.startsWith("</") &&
            !lineaTrim.endsWith("/>") &&
            !lineaTrim.includes("</")
        ) {
            pad += 1;
        }
    });
    return formateado.trim();
}