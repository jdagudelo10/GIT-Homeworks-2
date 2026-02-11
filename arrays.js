//1. forEach: Ejecuta la función definida en ƒ por cada uno de los elementos del array.
const letters = ["a", "b", "c", "d"];

letters.forEach((element) => console.log(element));
// Devuelve 'a' / 'b' / 'c' / 'd'

letters.forEach((element, index) => console.log(element, index));
// Devuelve 'a' 0 / 'b' 1 / 'c' 2 / 'd' 3

letters.forEach((element, index, array) => console.log(array[0]));
// Devuelve 'a' / 'a' / 'a' / 'a'

//---------------------------------------------------------------

//2. Función .every(): El método every() permite comprobar si todos y cada uno de los elementos de 
// un array cumplen la condición que se especifique en la  function callback:

letters.every((letter) => letter.length === 1); // true

//--------------------------------------------------------------

//3. método .map(): su objetivo es devolver un nuevo array donde cada uno de sus elementos será lo 
// que devuelva la función callback por cada uno de los elementos del array original:

const names = ["Ana", "Pablo", "Pedro", "Pancracio", "Heriberto"];
const nameSizes = names.map((name) => name.length);

nameSizes; // Devuelve [3, 5, 5, 9, 9]

//------------------------------------------------------------------

//4. .filter(): nos permite filtrar los elementos de un array y devolver un nuevo array con sólo los elementos que queramos.
const filteredNames = names.filter((name) => name.startsWith("P"));

filteredNames; // Devuelve ['Pablo', 'Pedro', 'Pancracio']

//------------------------------------------------------------------

//5. .flatMap(): Se trata de un método que revisa todos los elementos del array en busca de arrays anidados, 
// y los aplana hasta el nivel level indicado por parámetro.

const values = [10, 15, 20, [25, 30], 35, [40, 45, [50, 55], 60]];

values.flat(0);         // [10, 15, 20, [25, 30], 35, [40, 45, [50, 55], 60]];
values.flat(1);         // [10, 15, 20, 25, 30, 35, 40, 45, [50, 55], 60];
values.flat(2);         // [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

// Idem al anterior, pero si hubieran más niveles los aplanaría todos
values.flat(Infinity);

//---------------------------------------------------------

//6. .find y .findIndex: Ambos se utilizan para buscar elementos de un array mediante una condición, la diferencia es que el primero devuelve el elemento 
// mientras que el segundo devuelve su posición en el array original.

names.find((name) => name.length == 5);       // 'Pablo'
names.findIndex((name) => name.length == 5);  // 1

// 7. findLast y findLastIndex: que son las funciones equivalentes a findIndex() y find(), pero buscando elementos 
// desde derecha a izquierda, en lugar de izquierda a derecha

names.findLast((name) => name.length == 5);       // 'Pedro'
names.findLastIndex((name) => name.length == 5);  // 2

//8. reduce y reduceRight: Ambos métodos se encargan de recorrer todos los elementos del array, 
// e ir acumulando sus valores (o alguna operación diferente) y sumarlo todo, para devolver su resultado final.

const numbers = [95, 5, 25, 10, 25];
numbers.reduce((first, second) => {
  console.log(`F=${first} S=${second}`);
  return first + second;
});

numbers.reduce((first, second) => first - second);
// 95 - 5 - 25 - 10 - 25. Devuelve 30

numbers.reduceRight((first, second) => first - second);
// 25 - 10 - 25 - 5 - 95. Devuelve -110

//-----------------------------------------

//9. push(): poner al final
let frutas = ["manzana", "pera"];
frutas.push("mango");

console.log(frutas);
// ["manzana", "pera", "mango"]

//------------------------------------------------

//10. pop(): elimina el último elemento
frutas.pop();

console.log(frutas);
// ["manzana", "pera"]

//---------------------------

//11. shift(): elimina el primero
frutas.shift();

console.log(frutas);
// ["pera", "mango"]

//-----------------------------------------------------

//12. unshift: agrega al inicio
frutas.unshift("manzana");

console.log(frutas);
// ["manzana", "pera", "mango"]

//---------------------------------------------------------------

//13. splice(): agrega, elimina o reemplaza
numeros.splice(1, 2); 
// desde índice 1, elimina 2 elementos

console.log(numeros);
// [1, 4]

numeros.splice(1, 0, 2, 3);

console.log(numeros);
// [1, 2, 3, 4]

//--------------------------

//14. sort(): ordena el array

let numeros = [3, 1, 4, 2];
numeros.sort((a, b) => a - b);

console.log(numeros);
// [1, 2, 3, 4]

//----------------------------

//15. reverse(): invierte el orden
numeros.reverse();

console.log(numeros);
// [3, 2, 1]

//-----------------------------------

//16. fill(): rellena con un valor
numeros.fill(0, 1, 3);
// desde índice 1 hasta antes del 3

console.log(numeros);
// [1, 0, 0, 4]

//17. copyWithin(): 
numeros.copyWithin(0, 2);
// copia desde índice 2 al inicio

console.log(numeros);
// [3, 4, 3, 4]

//--------------------------------------------

//18. join(): convierte en string
let resultado = frutas.join(" - ");

console.log(resultado);
// "manzana - pera - mango"

//19. toString(): convierte en string
let resultadoTS = frutas.toString();

console.log(resultado);
// "manzana,pera,mango"

//-------------------

//20. Array.isArray(): verifica si el array es un array
Array.isArray([1,2,3]); // true

//-------------------------------------------

//21. Array.of(): e usa para crear un array a partir de los valores que le pases como argumentos.
let numerico = Array.of(1, 2, 3);

console.log(numeros);
// [1, 2, 3]

//22. some(): se usa para verificar si al menos un elemento del array cumple una condición.
let numeross = [5, 8, 12, 3];

let resultados = numeros.some(num => num > 10);

console.log(resultado);
// true

