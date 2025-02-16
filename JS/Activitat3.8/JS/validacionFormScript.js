const formulario = document.querySelector('form');
const regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let nombre = document.getElementById('nombre');
    let email = document.getElementById('email');
    let asunto = document.getElementById('asunto');
    let mensaje = document.getElementById('mensaje');
    if (nombre.value.trim() === '') {
        alert('El campo nombre no puede estar vacío');
        nombre.focus();
    } else if (regExpEmail.test(email.value) == false) {
        alert('El campo email no cumple con el formato de email');
        email.focus();
    } else if (asunto.value.trim() === '') {
        alert('El campo asunto no puede estar vacío');
        asunto.focus();
    } else if (mensaje.value.trim() === '') {
        alert('El campo mensaje no puede estar vacío');
        mensaje.focus();
    } else {
        formulario.submit();
        alert('Formulario enviado correctamente');
    }
});