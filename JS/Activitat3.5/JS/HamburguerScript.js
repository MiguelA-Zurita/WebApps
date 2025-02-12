const hamburguesa = document.getElementById("hamburguer");
hamburguesa.addEventListener("click", function(isOn){
    const menuNav = document.querySelector("nav");
    menuNav.classList.toggle("modoHamburguesa");
});