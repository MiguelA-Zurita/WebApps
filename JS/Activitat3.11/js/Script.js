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

    else if(fechaVuelta.value < fechaIda.value){
        alert("La fecha de ida no puede ser menor a la fecha de ida! No somos una máquina del tiempo");
    }
    
});
/* 
- Para preparar los datos para enviar por get:
     // Redirigir a la pàgina de confirmació amb els paràmetres de la reserva amb mètode GET
     var urlCompleta = "dispo.html?paramOrigen=" + encodeURIComponent(origen);
     window.location.href = urlCompleta;

- Para recoger los datos desde el get:
     const params = new URLSearchParams(window.location.search);
     const origen = params.get("paramOrigen");

- Tras recoger los datos con localStorage, si ya no se necesitan, hay que borrarlos con: localStorage.removeItem("paramOrigen"); 

- Si usamos un <select> con <options> y queremos indicar un value diferente al textContent, recogemos el textContent con: querySelector(opcion:checked) y luego el textContent. */