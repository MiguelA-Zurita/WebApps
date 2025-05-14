const campoOrigen = document.getElementById(origen);
const campoDestino = document.getElementById(destino);
const campoAdultos = document.getElementById(adults);
const campoInfants = document.getElementById(infants);
const campoFechaInicio = document.getElementById(dataInici);
const campoFechaFin = document.getElementById(dataFi);

//TODO: terminar la función
function cercarDisponibilitat(){
    if (!this.validateCampos()){
        return
    }
    var xmlString = "<root></root>"
    var parser = new DOMParser();  
    var xmlDoc = parser.parseFromString(xmlString, "application/xml");
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