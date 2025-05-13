const nombre = document.getElementById("nombrePerfil");
const fecha = document.getElementById("fechaNacimientoPerfil");
const email = document.getElementById("emailPerfil");
const ciudad = document.getElementById("ciudadPerfil");
const codigoPostal = document.getElementById("codigoPostalPerfil");
const categoria = document.getElementById("categoriaPerfil");
const newsletter = document.getElementById("suscripcionPerfil");

nombre.value = localStorage.getItem("nombreUsuario");
fecha.value = localStorage.getItem("fechaUsuario");
email.value = localStorage.getItem("emailUsuario");
ciudad.value = localStorage.getItem("ciudadUsuario");
codigoPostal.value = localStorage.getItem("codigoPostalUsuario");
categoria.value = localStorage.getItem("categoriaUsuario");
if(localStorage.getItem("newsletterUsuario") == "on"){
    newsletter.value = true;
} else{
    newsletter.value = false;
}

const modificarButton = document.getElementById("modificar");
const guardarButton = document.getElementById("guardar");
const cerrarSesionButton = document.getElementById("cerrarSesion");

modificarButton.addEventListener('click', function(event){
    modificarButton.style.display = "none";
    let botones = document.getElementsByTagName("input");
    for (let i = botones.length; i>0; i-- ){  
        let boton = botones[i];
        if(boton.id !== "emailPerfil"){
            boton.readOnly = false;
            boton.disabled = false;
        }
    }
    guardarButton.style.display = "flex";
})

guardarButton.addEventListener('click',function(event){
    localStorage.setItem("nombreUsuario", nombre.value);
    localStorage.setItem("fechaUsuario", fecha.value);
    localStorage.setItem("emailUsuario", email.value);
    localStorage.setItem("ciudadUsuario", ciudad.value);
    localStorage.setItem("codigoPostalUsuario", codigoPostal.value);
    localStorage.setItem("categoriaUsuario", categoria.value);
    localStorage.setItem("newsletterUsuario", newsletter.value);

    let botones = document.getElementsByTagName("input");
    for (let i = botones.length; i>0; i-- ){  
        let boton = botones[i];
        if(boton.id !== "emailPerfil"){
            boton.readOnly = true;
            boton.disabled = true;
        }
    }
    guardarButton.style.display = "none";
    modificarButton.style.display = "flex";
});

cerrarSesionButton.addEventListener('click', function(event){
    
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("fechaUsuario");
    localStorage.removeItem("emailUsuario");
    localStorage.removeItem("ciudadUsuario");
    localStorage.removeItem("codigoPostalUsuario");
    localStorage.removeItem("categoriaUsuario");
    localStorage.removeItem("newsletterUsuario");

    window.location.href = "registro.html";
});

const authorList = document.getElementById("anadirAutor");
