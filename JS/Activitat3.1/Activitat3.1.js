 const colors = ["black", "green", "white", "blue", "yellow"] 
 var actualColor = parseInt(0);
 
 function enlarge(){
   let paragraf = document.getElementById('paragraf');
   let computed = window.getComputedStyle(paragraf, null)
   let exampleFontSize = parseInt(computed.getPropertyValue("font-size"));
   let value = parseInt(exampleFontSize) + 2;
   paragraf.style.fontSize = value + "pt";
 }

 function lower(){
   let paragraf = document.getElementById('paragraf');
   let exampleFontSize = parseInt(paragraf.style.getPropertyValue("font-size"));
   let value = exampleFontSize - 2;
   paragraf.style.fontSize = value + "pt";
 }

 function changeColor(){
   let paragraf = document.getElementById("paragraf");
   if (actualColor==4){
    actualColor = 0;
   } else{
    actualColor++;
   }
   paragraf.style.setProperty("color", colors[actualColor]);
 }