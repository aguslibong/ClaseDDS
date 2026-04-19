const seedrandom = require('seedrandom');

let rng = seedrandom(1763519)

const arrayNum = []; // esta variable tiene los 50 numeros

//creacion Array 
for (let index = 0; index < 50; index++){
    let myrng = rng.int32();
    arrayNum.push(myrng)
}

