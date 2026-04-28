const seedrandom = require('seedrandom');

let rng = seedrandom(1763519)

const arrayNum = []; 

//creacion Array 
for (let index = 0; index < 50; index++){
    let myrng = rng.int32();
    arrayNum.push(myrng)
}

//recorré el array completo y mostrá por consola la suma total de todos los números. 
let acum = 0
let mayor = 0
let menor = 0
for (let index = 0; index < arrayNum.length ; index++){
    arrayNum[index]
    acum = acum + arrayNum[index]
    if (arrayNum[index] > mayor){
        mayor = arrayNum[index]
}
    if (arrayNum[index] < menor){
        menor = arrayNum[index]
    
    }
}    
console.log(acum)
console.log(mayor)
console.log(menor)


// for (posicion inicail, condidion posision final, pasos)

