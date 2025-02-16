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
    document.querySelectorAll(".tituloCamiseta").forEach(titulo => {
        if (titulo.innerText.toLowerCase().includes(busqueda)){
            titulo.parentNode.style.display = "flex";  
        } else{
            titulo.parentNode.style.display = "none";
        }
    });
    
});
