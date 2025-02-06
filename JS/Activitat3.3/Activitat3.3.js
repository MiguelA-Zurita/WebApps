 const colors = ["black", "green", "white", "blue", "yellow"] 
 var actualColor = parseInt(0);
 
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