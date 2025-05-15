const campoOrigen = document.getElementById("origen");
const campoDestino = document.getElementById("desti");
const campoAdultos = document.getElementById("adults");
const campoInfants = document.getElementById("infants");
const campoFechaInicio = document.getElementById("dataInici");
const campoFechaFin = document.getElementById("dataFi");

const arrayElementos = [campoOrigen, campoDestino, campoAdultos, campoInfants, campoFechaInicio, campoFechaFin];
const etiquetaElementos = ["origen", "destino", "adultos", "infants", "fechainicio", "fechafin"];

const serializer = new XMLSerializer();

var isJSON = false;


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
    if (!isJSON) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let xmlDoc = this.responseXML;
                    let jsonSerializado = '{';
                    let busquedas = xmlDoc.getElementsByTagName("busqueda");
                    for (let i = 0; i < busquedas.length; i++) {
                        let busqueda = alumnes[i];
                        let nodoValue = busqueda.getElementsByTagName(etiquetaElementos[i])[0].textContent;
                        let nodoNombre = etiquetaElementos[i];
                        jsonSerializado += `"${nodoNombre}": "${nodoValue}"`
                        if (i = busquedas.length-1){
                            jsonSerializado += "}";
                        } else{
                            jsonSerializado += ","
                        }
                    }
                    document.getElementById("conversio").textContent = jsonSerializado;
                }
                if(this.status == 404){
                    document.getElementById("conversio").textContent = "No se ha encontrado el XML disponibilitat.xml!";
                }
            };
            xhttp.open("GET", "disponibilitat.xml", true);
            xhttp.send();
    }
    else{

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
    let xmlString = "<busqueda></busqueda>"
    var parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const root = xmlDoc.getElementsByTagName("busqueda")[0];
    for (i = 0; i < arrayElementos.length; i++) {
        let nodo = xmlDoc.createElement(etiquetaElementos[i]);
        nodo.textContent = arrayElementos[i].value
        root.appendChild(nodo);
    }
    guardarDisponibilidad(xmlDoc);
    let xmlSerializado = serializer.serializeToString(xmlDoc);
    document.getElementById("disponibilitat").textContent = formateoXML(xmlSerializado);
}

function mostrarHoteles() {
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
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
        let vuelos = JSON.parse(this.responseText);
        let resultado = "";
        for (let vuelo of vuelos) {
            if (vuelo.origen == campoOrigen.value && vuelo.desti == campoDestino.value) {
                resultado += `${vuelo.origen} hacia ${vuelo.desti} con Precio: ${vuelo.preu}\n`;
            }
        }
        document.getElementById("resultatsVols").textContent = resultado || "No se encontraron vuelos.";

    };
    xmlhttp.open("GET", "vols.json");
    xmlhttp.send();
}

function guardarDisponibilidad(xmlDoc) {
    const xmlString = serializer.serializeToString(xmlDoc);

    // Crear un blob (arxiu binari) per a poder descarregar l'xml
    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    // Crear un enllaç i simular el clic per descarregar
    const link = document.createElement('a');
    link.href = url;
    link.download = 'disponibilitat.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
