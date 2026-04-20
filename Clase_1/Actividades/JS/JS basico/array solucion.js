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
for (let index = 0; index < arrayNum.length ; index++){
    arrayNum[index]
    acum = acum + arrayNum[index]
}
console.log(acum)

// for (posicion inicail, condidion posision final, pasos)

