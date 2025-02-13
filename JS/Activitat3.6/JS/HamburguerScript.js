const hamburguesa = document.getElementById("hamburguer");
hamburguesa.addEventListener("click", function(isOn){
    const menuNav = document.querySelector("nav");
    menuNav.classList.toggle("modoHamburguesa");
});

const links = document.querySelectorAll("nav a");
links.forEach(function(link){
    link.addEventListener("click", function(){
        const menuNav = document.querySelector("nav");
        menuNav.classList.toggle("modoHamburguesa");
    });
});
const buscador = document.getElementById("busqueda");

buscador.addEventListener("input", function(buscarCamiseta){
    busqueda = buscador.value.toLowerCase();
    document.querySelectorAll("img").forEach(imagen => {
        let titulo = imagen.nextSibling.innerText
        if (titulo == busqueda){
            
        }
    });
    
});
