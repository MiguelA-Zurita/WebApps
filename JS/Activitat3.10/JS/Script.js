const seccionDificultad = document.getElementById('startmenu');
const seccionJuego = document.getElementById('playmenu');
const seccionGanador = document.getElementById('winnermenu');
const dificultad = document.querySelector('select');
const numberInput = document.querySelector('input');
const minmaxText = document.getElementById('minmax');
const hintText = document.getElementById('hint');
var mode;
var hiddenNumber;

function validateDifficulty(){
    switch (dificultad.value){
        case ('easy'):
            mode = 1
            break;
        case ('normal'):
            mode = 2
            break;
        case ('hard'):
            mode = 3
            break;
        default:
            alert("You must choose a difficulty!");
            return
    }
    startgame();
}

function startgame(){
    seccionDificultad.style.display = 'none';
    seccionJuego.style.display = 'block';

    switch(mode){
        case(1):
        hiddenNumber = Math.floor(Math.random() * 10) + 1;
        minmaxText.textContent = "It's a number between 1 and 10!";
        break;
        case(2):
        hiddenNumber = Math.floor(Math.random() * 50) + 1;
        minmaxText.textContent = "It's a number between 1 and 50!";
        break;
        case(3):
        hiddenNumber = Math.floor(Math.random() * 100) + 1;
        minmaxText.textContent = "It's a number between 1 and 100!";
        break;
    }
}

function validateNumber(){
    let valor = parseInt(numberInput.value);
    if(valor == hiddenNumber){
        endGame();
    } else if(valor > hiddenNumber){
        hintText.textContent = "The number you entered is bigger than the number I'm thinking!";
    } else if(valor < hiddenNumber){
        hintText.textContent = "The number you entered is smaller than the number I'm thinking!";
    }
    numberInput.value = ''
}

function endGame(){
    seccionJuego.style.display = 'none';
    seccionGanador.style.display = 'block';
}

function restart(){
    seccionGanador.style.display = 'none';
    seccionDificultad.style.display = 'block';
}