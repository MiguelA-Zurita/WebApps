const formulario = document.getElementById("registroForm");
const nombre = document.getElementById("nombre");
const fecha = document.getElementById("fechaNacimiento");
const email = document.getElementById("email");
const ciudad = document.getElementById("ciudad");
const codigoPostal = document.getElementById("codigoPostal");
const categoria = document.getElementById("categoria");
const newsletter = document.getElementById("newsletter");
const paragrafoError = document.getElementById("errorValidacion");
const regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function validarEmail(email){
    return true;
}
formulario.addEventListener("submit", function(event){
    event.preventDefault();
    if(fecha > (new Date())){
        console.log("Entro a la validaicon de fecha")
        paragrafoError.textContent = "La fecha debe ser anterior al día de hoy!";
        return;
    } 
    if(!regExpEmail.test(email.value)){
        console.log("Entro a la validacion de mail")
        paragrafoError.textContent = "El email no tiene la estructura correcta!";
        return;
    }
    else{
        localStorage.setItem("nombreUsuario", nombre.value);
        localStorage.setItem("fechaUsuario", fecha.value);
        localStorage.setItem("emailUsuario", email.value);
        localStorage.setItem("ciudadUsuario", ciudad.value);
        localStorage.setItem("codigoPostalUsuario", codigoPostal.value);
        localStorage.setItem("categoriaUsuario", categoria.value);
        localStorage.setItem("newsletterUsuario", newsletter.value);

        window.location.href = "perfil.html";
    }
});







