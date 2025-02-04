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