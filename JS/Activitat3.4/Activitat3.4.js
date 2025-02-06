 const colors = ["black", "green", "white", "blue", "yellow"];
 var actualColor = parseInt(0);
 var spanishIsOn = true;
 var spanishText = "Cuando yo tenía seis años vi en el libro sobre la selva virgen: Historias vividas, una grandiosa estampa. Representaba una serpiente boa comiéndose a una fiera. He aquí la copia del dibujo. En el libro se afirmaba: “La serpiente boa se traga su presa entera, sin masticarla. Luego, como no puede moverse, duerme durante los seis meses que dura su digestión”. Reflexioné mucho en ese momento sobre las aventuras de la jungla y logré trazar con lápices de colores mi primer dibujo.";
 var englishText = "When I was six years old I saw a great picture in the book about the virgin forest: Vivid Stories. It represented a boa snake eating a beast. Here is the copy of the drawing. The book stated: “The boa snake swallows its prey whole, without chewing it. Then, since he cannot move, he sleeps for the six months that his digestion lasts.” I reflected a lot at that time on the adventures of the jungle and managed to draw my first drawing with colored pencils";

 function enlarge(){
   let paragraf = document.getElementById('paragraf');
   let exampleFontSize = window.getComputedStyle(paragraf).getPropertyValue("font-size");
   let value = parseInt(exampleFontSize) + 2;
   paragraf.style.fontSize = value + "px";
 }

 function lower(){
  let paragraf = document.getElementById('paragraf');
  let exampleFontSize = window.getComputedStyle(paragraf).getPropertyValue("font-size");
  let value = parseInt(exampleFontSize) - 2;
  paragraf.style.fontSize = value + "px";
 }

 function changeColor(){
   let paragraf = document.getElementById("paragraf");
   if (actualColor==4){
    actualColor = 0;
   } else{
    actualColor++;
   }
   paragraf.style.color = colors[actualColor];
 }

 function addText(){
  let addedText = prompt("Add the text you want to add to a paragraph");
  let paragraph = document.createElement("p");
  paragraph.className = "addedText";
  paragraph.innerHTML = addedText;
  document.body.appendChild(paragraph);
 }

 function removeText(){
  let paragraph = document.getElementsByClassName("addedText");
  if (paragraph.length == 0){
    alert("There are no paragraphs to remove");
  } else{
    let lastParagraph = paragraph[paragraph.length-1];
    lastParagraph.remove();
  }
 }

 function addClass(){
  let secondParagraph = document.querySelector("p").nextElementSibling;
  secondParagraph.className = 'segonparagraf';
 }

 function removeClass(){
  let allElements = document.getElementsByClassName("segonparagraf")
  let secondParagraph = allElements[allElements.length-1];
  secondParagraph.classList.remove("segonparagraf");
 }

 document.getElementById("toggleLangButton").addEventListener("click", function(changeLanguage){
  if (spanishIsOn){
    document.getElementById("principito").textContent = englishText;
    spanishIsOn = false;
  } else{
    document.getElementById("principito").textContent = spanishText;
    spanishIsOn = true;
  }
  });

  document.getElementById("hoverToChangeColor").addEventListener("mouseover", function(changeBackground){
    document.getElementById("hoverToChangeColor").className = "botonCambiante";
  });

  document.getElementById("hoverToChangeColor").addEventListener("mouseout", function(changeBackground){
    document.getElementById("hoverToChangeColor").classList.remove("botonCambiante");
  });