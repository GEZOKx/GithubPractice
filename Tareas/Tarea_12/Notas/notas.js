//add event listener
    
const boton = document.querySelector("#miBoton");

boton.addEventListener("click", function () {
  console.log("¡Me dieron clic!");
});

// también funciona con arrow function
boton.addEventListener("click", () => console.log("¡Clic otra vez!"));

//evento teclado
const input = document.querySelector("#texto");

input.addEventListener("keydown", function (e) {
  console.log("Se presionó:", e.key);  // ej. "a", "Enter", "Shift"
  console.log("Código:", e.code);      // ej. "KeyA", "Enter", "ShiftLeft"
}, {once: true});

const form = document.querySelector("#miForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Formulario interceptado, no hubo recarga");
});

<input type="text" />
const usuario = form.elements.usuario;
console.log(usuario.value);

const campo = document.querySelector("#texto");
const vista = document.querySelector("#vistaPrevia");

campo.addEventListener("input", function () {
  vista.textContent = campo.value; // se actualiza letra por letra
});

document.querySelector("#interno").addEventListener("click", () => {
  console.log("Clic en el botón");
});

document.querySelector("#contenedor").addEventListener("click", () => {
  console.log("Clic en el contenedor"); // también se dispara
});

//delegacion 
const lista = document.querySelector("#lista");

lista.addEventListener("click", function (e) {
  console.log("Se hizo clic en:", e.target);
  e.target.classList.toggle("seleccionado");
});

//emisor

class Emisor {
  constructor() {
    this.listeners = [];
  }

  addEventListener(callback) {
    this.listeners.push(callback);
  }

  emitir(dato) {
    this.listeners.forEach((callback) => callback(dato));
  }
}

const carrito = new Emisor();

carrito.addEventListener((total) => console.log(`Nuevo total: $${total}`));
carrito.addEventListener((total) => console.log(`Actualizando UI con $${total}`));

carrito.emitir(150); // dispara ambos listeners, en el orden en que se agregaron