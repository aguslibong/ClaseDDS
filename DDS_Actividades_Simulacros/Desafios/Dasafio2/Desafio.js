const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, './data/personas.json');

const fileContent = fs.readFileSync(filePath, 'utf8');
const personas = JSON.parse(fileContent);

//console.log(personas)

let promEdad = (personas) => {
    let suma = 0;
    personas.forEach(element => {
        suma += element.edad;
    });
    return (personas != 0) ? Math.round(suma/personas.length) : "array vacio";
}
console.log("1:");
console.log(promEdad(personas));
console.log("--------------------------------------------------------------");

let joven = (array) => {
    let joven = array[0];
    array.forEach(element => {
        if (element.edad < joven.edad){
            joven = element
        };
    });
    return joven
}
console.log("2:");
console.log(joven(personas));
console.log("--------------------------------------------------------------");

let gomez = (array) => {
    nombrar = (pers) => {
        let text = ""
        pers.forEach(element => {
            text += element+',';
        });
        return text
    }
    let gomezband = []
    array.forEach(element => {
        if (element.apellido === 'GOMEZ'){
            gomezband.push(element.nombre);
        }
    });
    gomezband.sort();
    return nombrar(gomezband);
}
console.log("3:");
console.log(gomez(personas));
console.log("--------------------------------------------------------------");

//nombre par
//apellido impar
let apellidoSuma = (array) => {
    let suma = 0;
    array.forEach(element => {
        if ((element.nombre.length%2 == 0) && (element.apellido.length%2 != 0)){
            suma += element.edad
        };
    });
    return suma
}
console.log("4:");
console.log(apellidoSuma(personas));
console.log("--------------------------------------------------------------");

let json5 = (array) => {
    let mayores = 0;
    let menores = 0;
    let primeraMitad = 0;
    let segundaMitad = 0;
    array.forEach(element => {
        (element.edad > 18) ? mayores++ : menores++;
        let primeraLetraMayuscula = element.apellido.toUpperCase();
        (primeraLetraMayuscula >= "A" && primeraLetraMayuscula<"M") ? primeraMitad++:segundaMitad++;
    });
    let objto5 = {
        mayores,
        menores,
        primeraMitad,
        segundaMitad
    };
    let json = JSON.stringify(objto5);
    return json;
};
console.log("5:");
console.log(json5(personas));
console.log("--------------------------------------------------------------");


/*- CASTILLO
  - DIAZ
  - FERRER
  - PINO
  - ROMERO*/

  let json6 = (array) => {
    let CASTILLO = 0;
    let DIAZ = 0;
    let FERRER = 0;
    let PINO = 0;
    let ROMERO = 0;
    array.forEach(element => {
        (element.apellido === "CASTILLO") ? CASTILLO++: CASTILLO;
        (element.apellido === "DIAZ") ? DIAZ++ : DIAZ;
        (element.apellido === "FERRER") ? FERRER++ : FERRER ;
        (element.apellido === "PINO") ? PINO++ : PINO ;
        (element.apellido === "ROMERO") ? ROMERO++ : ROMERO ;
    });
    let objto6 = {
        CASTILLO,
        DIAZ,
        FERRER,
        PINO,
        ROMERO,
    };
    let json = JSON.stringify(objto6);
    return json;
};
console.log("6:");
console.log(json6(personas));
console.log("--------------------------------------------------------------");
