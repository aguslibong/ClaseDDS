const seedrandom = require('seedrandom');

let rng = seedrandom(1763519)

const arrayNum = []; 

//creacion Array 
for (let index = 0; index < 50; index++){
    let myrng = rng.int32();
    arrayNum.push(myrng)
}


