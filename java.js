let nacimiento = parseInt(prompt("ingrese año de nacimiento"))
let año = parseInt(prompt("ingrese año del cual quiere saber la edad que va a tener"))
let edadFutura = año - nacimiento

for (edadFutura; edadFutura<70; edadFutura++){
    
    if (edadFutura < 18 ) {
        console.log("sos menor en el " + año + " te faltan " + (65 - edadFutura) + " años para jubilarte") 
    }
    else if (edadFutura < 65 ) {
        console.log("estas en tu etapa productiva en el " + año + " te faltan " + (65 - edadFutura) + " años para jubilarte")
    }
    else if (edadFutura >= 65) {
        console.log("ya te jubilaste !!!!")
    }
    año++; }