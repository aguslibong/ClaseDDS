const seedrandom = require('seedrandom');

// Generar 1000000 de números aleatorios enteros
const rng = seedrandom(1763519);
const numbers = [];
for (let i = 0; i < 1000000; i++) {
    numbers.push(rng.int32());
}

// Cantidad de números positivos y negativos
let positiveCount = 0;
let negativeCount = 0;
for (const number of numbers) {
    if (number > 0) {
        positiveCount++;
    } else if (number < 0) {
        negativeCount++;
    }
}

// Cantidad de números con resto 0, 3, 5 o 6 al dividir por 7
const remainderCounts = [0, 0, 0, 0];
for (const number of numbers) {
    const remainder = Math.abs(number) % 7;
    if (remainder === 0 || remainder === 3 || remainder === 5 || remainder === 6) {
        remainderCounts[remainder]++;
    }
}

// Arreglo de contadores según el anteúltimo dígito
const digitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (const number of numbers) {
    const secondLastDigit = Math.floor(Math.abs(number / 10) % 10);
    digitCounts[secondLastDigit]++;
}

// Valor y posición del menor de todos
let minValue = numbers[0];
let minPosition = 1;
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < minValue) {
        minValue = numbers[i];
        minPosition = i + 1;
    }
}

// Cantidad de números con el mismo signo que el anterior
let sameSignCount = 0;
for (let i = 1; i < numbers.length; i++) {
    if (Math.sign(numbers[i]) === Math.sign(numbers[i - 1])) {
        sameSignCount++;
    }
}

// Promedio entero de números con exactamente 6 dígitos
let sumSixDigitNumbers = 0;
let sixDigitCount = 0;
for (const number of numbers) {
    if (Math.abs(number) >= 100000 && Math.abs(number) < 1000000) {
        sumSixDigitNumbers += number;
        sixDigitCount++;
    }
}
const averageSixDigit = Math.round(sumSixDigitNumbers / sixDigitCount);

// Resultados
console.log('Cantidad de números positivos:', positiveCount);
console.log('Cantidad de números negativos:', negativeCount);
console.log('Cantidad de números con resto 0:', remainderCounts[0]);
console.log('Cantidad de números con resto 3:', remainderCounts[3]);
console.log('Cantidad de números con resto 5:', remainderCounts[5]);
console.log('Cantidad de números con resto 6:', remainderCounts[6]);
console.log('Suma de Num:', remainderCounts[3]+remainderCounts[0]);
console.log('Arreglo de contadores según anteúltimo dígito:', digitCounts);
console.log('Valor del menor número:', minValue);
console.log('Posición del menor número:', minPosition);
console.log('Cantidad de números con el mismo signo que el anterior:', sameSignCount);
console.log('Promedio entero de números con exactamente 6 dígitos:', averageSixDigit);