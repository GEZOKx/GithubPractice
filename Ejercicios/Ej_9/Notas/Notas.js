let intentos=0;
intentos += 1 ;

const constIntentos = 10;
//maximoIntentos = 20;

let pendientes = ["tarea", "examen"];
pendientes = []; //ok: let permite reasignar

const invitados = ["Ana", "Luis"];
invitados.pop();    // Quita al final
invitados.push("Carla");    //Agrega al final
invitados.shift()   //Quita al inicio
invitados.unshift()   //Quita al Agrega al inicio
invitados[1]; //    Revisar por idx
invitados[1]= "Javier" //   Reasignar por idx

//invitado[];
let prueba="No borrar"
if (true)
{
    prueba = "hola";  //Nodeja
}
console.log(prueba)

let dato = "hola";   // string
dato = 5;            // ahora es number, y no da error
console.log("Dato cambia a"+typeof dato); // "number"

console.log("Probando edad: ")
let edad = 20;
let tieneCredencial = false;

if (edad >= 18 && tieneCredencial) {
  console.log("Puede entrar");
}

if (edad < 12 || edad > 65) {
  console.log(`Tarifa especial con ${edad}años`);
}

if(!tieneCredencial)
{
    console.log("Sin credencial")
}

let temperatura = 30;

if (temperatura > 35) {
  console.log("Hace mucho calor");
} else if (temperatura > 20) {
  console.log("Clima agradable");
} else {
  console.log("Hace frío");
}

let dia = 3;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  default:
    console.log("Otro día");
}  

edad = 16;
let entrada = edad >= 18 ? "Adulto" : "Menor";
console.log(`El usuario es ${entrada}`)

//ciclos

// for clásico
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// while
intentos = 0;
while (intentos < 3) {
    console.log("Intento " + intentos);
    intentos = intentos + 1;
}

// for...of sobre un arreglo
let colores = ["rojo", "verde", "azul"];
for (let color of colores) {
    console.log(color.toUpperCase());
}


for (let i = 0; i < 10; i++) {
    if (i === 5) break;     // termina el ciclo por completo
    if (i % 2 === 0) continue; // salta a la siguiente vuelta
    console.log(i); // imprime 1, 3
}

// Declaración de función
function sumar(a, b) {
    return a + b;
}

// Función flecha (arrow function), guardada en una variable
const sumar2 = (a, b) => {
    return a + b;
};

const sumar3 = (a, b) => a + b;

sumar(2, 3);  // 5
sumar2(2, 3); // 5

// Con else: el caso normal queda anidado
function dividir(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return null;
    }
}

// Con cláusula de guarda: el caso inválido sale primero
function dividir2(a, b) {
    if (b === 0) {
        return null; // se sale aquí, lo de abajo ya no corre
    }
    return a / b;
}


function esMayorDeEdad(edad) {
    if (edad < 18) {
        return false;
    }
    return true;
}

if (!esMayorDeEdad(15)) {
    console.log("No puede votar");
}


function saludar(nombre = "invitado") {
    return `Hola, ${nombre}`;
}

saludar("Luis"); // "Hola, Luis"
saludar();       // "Hola, invitado"

function calcularSubtotal(precio, cantidad) {
    return precio * cantidad;
}

function calcularConImpuesto(precio, cantidad) {
    const subtotal = calcularSubtotal(precio, cantidad);
    return subtotal * 1.16;
}

let frutas = ["manzana", "pera", "uva"];

frutas.length;      // 3
frutas[0];           // "manzana"
frutas[frutas.length - 1]; // "uva" (el último elemento)

frutas.push("mango"); // agrega al final
frutas;                // ["manzana", "pera", "uva", "mango"]

let vidas = [3, 3, 3];

vidas[1] = 5;            // [3, 5, 3]
vidas[0] = vidas[0] - 1; // [2, 5, 3]  (usa su propio valor para calcular el nuevo)

let temperaturas = [22, 25, 19, 30];

for (let i = 0; i < temperaturas.length; i++) {
    console.log(`Día ${i}: ${temperaturas[i]}°C`);
}


// Regresa la posición del primer número mayor que el límite
function buscarPrimeroMayor(numeros, limite) {
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] > limite) {
            return i;
        }
    }
    return -1; // ninguno fue mayor
}

buscarPrimeroMayor([4, 9, 12], 8);  // 1
buscarPrimeroMayor([4, 9, 12], 20); // -1

temperaturas.forEach((element)=> console.log(element * 2));

const dobletemperaturas = temperaturas.map(temperatura => temperatura * 2);


const array = [1, 2, 3, 4];

const initialValue = 0;
const sumWithInitial = array.reduce((accumulator, currentValue) => accumulator * currentValue, initialValue);
    
    console.clear()