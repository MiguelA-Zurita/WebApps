 const colors = ["black", "green", "white", "blue", "yellow"] 
 var actualColor = parseInt(0);
 
 function enlarge(){
   let paragraf = document.getElementById('paragraf');
   let exampleFontSize = paragraf.style.getPropertyValue("font-size");
   let value = parseInt(exampleFontSize) + 2;
   paragraf.style.setProperty("font-size", (toString(value) +"pt"));
 }

 function lower(){
   let paragraf = document.getElementById("paragraf");
   alert(paragraf.style.getPropertyValue('font-size'));
   var declaration = document.styleSheets[0].cssRules[0].style
   alert(declaration.getPropertyValue("font-size"));
   let exampleFontSize = parseInt(paragraf.style.getPropertyValue("font-size"));
   let value = exampleFontSize - 2;
   paragraf.style.setProperty("font-size", (toString(value) +"pt"));
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