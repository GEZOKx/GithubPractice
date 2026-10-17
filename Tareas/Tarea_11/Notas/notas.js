function saludar(nombre = "invitado", mensaje = "Hola") {
  console.log(`${mensaje}, ${nombre}`);
}

saludar();              // "Hola, invitado"
saludar("Sam");         // "Hola, Sam"
saludar("Sam", "Qué tal"); // "Qué tal, Sam"

function sumarTodo(...numeros) {
  return numeros.reduce((total, n) => total + n, 0);
}

sumarTodo(1, 2, 3);       // 6
sumarTodo(10, 20, 30, 40); // 100

function repartir(responsable, ...tareas) {
  console.log(`${responsable} se encarga de: ${tareas.join(", ")}`);
}

repartir("Dana", "limpiar", "cocinar", "comprar");

const numeros = [4, 8, 15, 16, 23, 42];
Math.max(...numeros); // 42 — equivale a Math.max(4, 8, 15, 16, 23, 42)

const frutas = ["manzana", "pera"];
const verduras = ["zanahoria", "apio"];
const todo = [...frutas, ...verduras];
// ["manzana", "pera", "zanahoria", "apio"]

const base = { tema: "claro", idioma: "es" };
const ajustes = { idioma: "en", notificaciones: true };
const configFinal = { ...base, ...ajustes };
// { tema: "claro", idioma: "en", notificaciones: true }

const colores = ["rojo", "verde", "azul"];
const [primero, segundo, ...resto] = colores;
// primero = "rojo", segundo = "verde", resto = ["azul"]

const producto = { nombre: "Teclado", precio: 450 };

const { nombre, precio: costo, stock = 0 } = producto;
// nombre = "Teclado", costo = 450, stock = 0 (no existía en el objeto)

function mostrarProducto({ nombre, precio }) {
  return `${nombre} cuesta $${precio}`;
}

mostrarProducto(producto); // "Teclado cuesta $450"

window.innerWidth;     // ancho de la ventana, en pixeles
window.location.href;  // la URL actual
window.open("https://www.ejemplo.com"); // abre una pestaña nueva

console.log(document); // todo el HTML de la página, como objeto

//usar de preferencia solo el querySelector y querySelectorAll, ya que son más flexibles y potentes que getElementById o getElementsByClassName para el proyecto final

const parrafo = document.querySelector("p");

parrafo.textContent = "Hola <b>mundo</b>"; // se ve el texto tal cual, con las etiquetas
parrafo.innerHTML = "Hola <b>mundo</b>";   // "mundo" se ve en negritas de verdad


//modificar css
const tarjeta = document.querySelector(".tarjeta");

function agregarClase(){
    tarjeta.classList.add("seleccionada");
}

function removerClase(){
    tarjeta.classList.remove("seleccionada");
}

function toggleClase(){
    tarjeta.classList.toggle("seleccionada");   
}

//create element
const nuevo = document.createElement("div");
nuevo.textContent = "Soy nuevo aquí";
nuevo.classList.add("tarjeta", "seleccionada");

const contenedor = document.querySelector("#lista");
contenedor.append(nuevo);

//remove element
const tarjetaRemover = document.querySelector(".tarjeta");
tarjetaRemover.remove();