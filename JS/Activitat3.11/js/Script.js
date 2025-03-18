const formulario = document.getElementById("formulario");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const fechaIda = document.getElementById("fechaida");
const fechaVuelta = document.getElementById("fechavuelta");
const numAdultos = document.getElementById("numadultos");
const numNinos = document.getElementById("numninos");
const descuento = document.getElementById("descuento");

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    if(origen.value == destino.value ){
        alert("El origen no puede ser el mismo que el destino!");
    }
    else if(fechaIda.value < new Date()){
        alert("La fecha de ida no puede ser menor a la fecha actual! No somos una máquina del tiempo");
    }
    else if(){
        
    }

});