const seedrandom = require('seedrandom');
const arrayNum = [];
let rng = seedrandom(1763519)
//creacion Array 
for (let index = 0; index < 1000000; index++){
    let myrng = rng.int32();
    arrayNum.push(myrng)
}
function separador(){
    console.log("-----------------------------------------------------")
}
separador()
//Cantidad Num Positivos y Negativos 
function CantNum(array){
    let numP = 0
    let numN = 0
    array.forEach(element => {
        if (element>0){
            numP++;
        }else if (element<0){
            numN ++;
        } else {
            numP = numP
            numN = numN
        }
    });
    console.log("Cantidad Num Pos: "+ numP + "\nCantidad Num Neg: " + numN)
}
CantNum(arrayNum)
separador()
//Funcion Division por 7
function Div_(array){
    let num = 0
    array.forEach(element => {
        (element % 7 === 0 || element % 7 === 3 || element % 7 === 5 || element % 7 === 6
        ) ? num ++ : num = num;
    });
    console.log("Cantidad Num/7 con % 0,3,5,7: "+ num)
}
Div_(arrayNum)
separador()
//Funcion Array Contador de Anteultimo Digito
function indice (array){
    const contadores = Array.from({ length: 10 }, () => 0);
    array.forEach(numero => {
        const anteultimoDigito = Math.abs(Math.floor(numero / 10) % 10);
        contadores[anteultimoDigito]++;
    });
    console.log(contadores);
}
indice(arrayNum)
separador()
//Menor Numero
function NMenos (array){
    let menor = array[0]
    let posicion = 1
    let sumP = 0
    array.forEach(element => {
        if (element < menor){
            sumP ++
            posicion = sumP
            menor = element
        } else{
            sumP ++
        }
    });
    return console.log({posicion, menor})
}
NMenos(arrayNum)
separador()
//Suma cantidad de elemtos q comprate Signo Con el anterior elemento
function anterior(array){
    function signo(num){
        if (num > 0){
            return true
        } else {
            return false
        }
    }
    anterior = array[0]
    let sum = 0
    array.forEach(element => {
        if (signo(anterior) == true && signo(element) == true){
            sum ++
            anterior = element
        } else if (signo(anterior) == false && signo(element) == false){
            sum ++
            anterior = element
        } else {
            anterior = element
        }
    });
    console.log("Suma de num Signo: " + (sum-1))
}
anterior(arrayNum)
separador()
//Funcion Promedio 6 digitos
function prom_Seis(array){
    let suma = 0
    let cant = 0
    array.forEach(element => {
        if (Math.abs(element) >= 100000 && Math.abs(element) <= 999999){
            suma += element
            cant ++
        }
    });
    return ((suma / cant))
}
console.log("Prom: " + Math.round(prom_Seis(arrayNum)))
separador()
