const campoOrigen = document.getElementById("origen");
const campoDestino = document.getElementById("desti");
const campoAdultos = document.getElementById("adults");
const campoInfants = document.getElementById("infants");
const campoFechaInicio = document.getElementById("dataInici");
const campoFechaFin = document.getElementById("dataFi");

const arrayElementos = [campoOrigen, campoDestino, campoAdultos, campoInfants, campoFechaInicio, campoFechaFin];
const etiquetaElementos = ["origen", "destino", "adultos", "infants", "fechainicio", "fechafin"];

const serializer = new XMLSerializer();


//TODO: terminar la función
function cercarDisponibilitat(){
    if (!validateCampos()){
        alert("Tienes un campo vacío o la fecha errónea!");
        return
    }
    crearXmlBusqueda();
    mostrarHoteles();
    mostrarVuelos();
}

function convertir(){

}

function validateCampos(){
    return campoOrigen.value !== '' &&
    campoDestino.value !== '' &&
    campoAdultos.value !== '' &&
    campoInfants.value !== '' &&
    campoFechaInicio.value !== '' &&
    campoFechaFin.value !== '' &&
    campoFechaFin.value >= campoFechaInicio.value;
}

function crearXmlBusqueda(){
    let xmlString = "<busqueda></busqueda>"
    var parser = new DOMParser();  
    let xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const root = xmlDoc.getElementsByTagName("busqueda")[0];
    for(i=0; i<arrayElementos.length; i++){
        let nodo = xmlDoc.createElement(etiquetaElementos[i]);
        nodo.textContent = arrayElementos[i].value
        root.appendChild(nodo);
    }
    let xmlSerializado = serializer.serializeToString(xmlDoc);
    document.getElementById("disponibilitat").textContent = formateoXML(xmlSerializado);
}

function mostrarHoteles(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let xmlDoc = this.responseXML;
            let xmlString = "";
            Array.from(xmlDoc.getElementsByTagName("desti")).forEach(nodo => {
                if(nodo.childNodes[0].nodeValue == campoDestino.value){
                   xmlString += serializer.serializeToString(nodo.parentNode);
                }
            });
            document.getElementById("resultatsHotels").textContent = xmlString;
        }
    };
    xhttp.open("GET", "hotels.xml", true);
    xhttp.send();
}

function mostrarVuelos(){
    let xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
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
