var contador = parseInt(0);
const paragrafoContador = document.querySelector("p");
const formulario = document.querySelector("form");

function contar(){
    if(contador>=9){
        document.getElementById("contar").style.display = "none";
        document.getElementById("reiniciar").style.display = "inline";
    }
    contador++;
    paragrafoContador.innerText = ("Aquí se muestran el número de clicks: " + contador);
}

function reiniciar(){
    contador = parseInt(0);
    paragrafoContador.innerText = ("Aquí se muestran el número de clicks: " + contador);
    document.getElementById("contar").style.display = "inline";
    document.getElementById("reiniciar").style.display = "none";
}

formulario.addEventListener("submit", function(event){
    event.preventDefault();
    let comentario = document.querySelector("input");
    let textoComentario = comentario.value;
    if(textoComentario.trim() == ''){
        alert("No puedes añadir un comentario vacío!");
        comentario.focus();
        return false;
    }else{
        let comentarioAnadido = document.createElement("p");
        comentarioAnadido.innerText = textoComentario.toLowerCase();
        comentarioAnadido.className = "comentario";
        document.querySelector("div").appendChild(comentarioAnadido);
        formulario.reset();
    }
})

function eliminarUltimoComentario(){
    try{
        let comentarios = document.querySelectorAll(".comentario");
        let ultimoComentario = comentarios[comentarios.length-1];
        ultimoComentario.remove();
    }catch(TypeError){
        alert("No hay ningún comentario para eliminar!");
    }
}
