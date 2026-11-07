// ===== Bienvenida: la D vuela hasta encajar en el logo del hero =====
// (va al principio para que un error más abajo no deje la pantalla bloqueada)
history.scrollRestoration = "manual";

const bienvenida = document.getElementById("bienvenida");
const logoVuela = document.getElementById("bienvenidaLogo");
const logoHero = document.getElementById("heroLogo");

// Zona de la D dentro del logo completo, como fracción (0 a 1) del ancho y del alto.
// Son estimaciones a ojo: ajústelas hasta que el recorte quede bien.
const D = { x: 0.074, y: 0, ancho: 0.225, alto: 0.845 };

const ESPERA = 2600;   // ms que la D se queda en el centro
const VUELO = 1500;    // ms que tarda en llegar al hero

let terminado = false;

function terminar() {
  if (terminado) return;
  terminado = true;
  document.body.classList.remove("cargando");  // muestra el hero y devuelve el scroll
  bienvenida.remove();
}

function iniciarBienvenida() {
  window.scrollTo(0, 0);
  const hero = logoHero.getBoundingClientRect();

  // El logo que vuela se coloca exactamente encima del hero
  logoVuela.style.left = hero.left + "px";
  logoVuela.style.top = hero.top + "px";
  logoVuela.style.width = hero.width + "px";
  logoVuela.style.height = hero.height + "px";

  // Zona de la D en píxeles, dentro del logo
  const dX = D.x * hero.width;
  const dY = D.y * hero.height;
  const dAncho = D.ancho * hero.width;
  const dAlto = D.alto * hero.height;

  // Cuánto se agranda la D en el centro de la pantalla
  const escala = Math.min(document.documentElement.clientHeight * 0.38, 340) / dAlto;

  // Dónde queremos el centro de la D y cuánto hay que mover el logo para lograrlo
  const centroX = document.documentElement.clientWidth / 2;
  const centroY = document.documentElement.clientHeight * 0.4;
  const mueveX = centroX - hero.left - escala * (dX + dAncho / 2);
  const mueveY = centroY - hero.top - escala * (dY + dAlto / 2);

  // Recorte: solo se ve la D (arriba, derecha, abajo, izquierda)
  const recorteD =
    "inset(" + (D.y * 100) + "% " + ((1 - D.x - D.ancho) * 100) + "% " +
    ((1 - D.y - D.alto) * 100) + "% " + (D.x * 100) + "%)";

  const inicio = {
    transform: "translate(" + mueveX + "px, " + mueveY + "px) scale(" + escala + ")",
    clipPath: recorteD
  };

  logoVuela.style.transform = inicio.transform;
  logoVuela.style.clipPath = inicio.clipPath;
  bienvenida.classList.add("lista");

  // Pasada la espera, la D viaja al hero mientras se revela el resto del logo
  setTimeout(function () {
    bienvenida.classList.add("saliendo");

    const vuelo = logoVuela.animate(
      [
        inicio,
        { transform: "translate(0px, 0px) scale(1)", clipPath: "inset(0% 0% 0% 0%)" }
      ],
      { duration: VUELO, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" }
    );

    vuelo.onfinish = terminar;
  }, ESPERA);
}

const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Respaldo: pase lo que pase, la página se libera
setTimeout(terminar, ESPERA + VUELO + 2500);

if (reducirMovimiento) {
  terminar();
} else if (logoHero.complete) {
  iniciarBienvenida();
} else {
  logoHero.addEventListener("load", iniciarBienvenida, { once: true });
}

// ===== Generar opciones de años para el select =====
const select = document.getElementById("anioVehiculo");
const anioActual = new Date().getFullYear();

for (let anio = anioActual + 1; anio >= anioActual - 30; anio--) {
  const opcion = document.createElement("option");
  opcion.value = anio;
  opcion.textContent = anio;
  select.appendChild(opcion);
}

// ===== Elementos que se usan en varias partes =====
const form = document.getElementById("formCotizar");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const marca = document.getElementById("VehiculoMarca");          // ahora es un select
const modeloSelect = document.getElementById("VehiculoModelo");  // también
const radios = document.querySelectorAll('input[name="btnradio"]');

const nombresTipo = { auto: "Auto/SUV", pickup: "Pickup", moto: "Motocicleta" };
const RECARGO_POR_ANIO = 100;

// ===== Teléfono: solo números mientras escribe =====
telefono.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

// ===== Correo: validar al salir del campo =====
email.addEventListener("blur", function () {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
    this.classList.remove("is-invalid");
  } else {
    this.classList.add("is-invalid");
  }
});

// ===== Catálogo de vehículos (datos.json) =====
let catalogo = {};

function tipoActual() {
  return document.querySelector('input[name="btnradio"]:checked').value;
}

// Vacía un select y lo llena con una opción inicial más las opciones dadas
function llenar(selectEl, opciones, textoInicial) {
  selectEl.innerHTML = "";

  const inicial = document.createElement("option");
  inicial.value = "";
  inicial.textContent = textoInicial;
  inicial.disabled = true;
  inicial.selected = true;
  selectEl.appendChild(inicial);

  opciones.forEach(function (texto) {
    const opcion = document.createElement("option");
    opcion.value = texto;
    opcion.textContent = texto;
    selectEl.appendChild(opcion);
  });
}

function cargarMarcas() {
  llenar(marca, Object.keys(catalogo[tipoActual()]), "Seleccione la marca");
  llenar(modeloSelect, [], "Seleccione primero la marca");
  modeloSelect.disabled = true;
  marca.classList.remove("is-invalid");
  modeloSelect.classList.remove("is-invalid");
}

fetch("datos.json")
  .then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (json) {
    catalogo = json;
    cargarMarcas();
  })
  .catch(function () {
    marca.innerHTML = '<option value="">No se pudo cargar el catálogo</option>';
  });

// Cambia el tipo de vehículo: se reinician marca y modelo
radios.forEach(function (radio) {
  radio.addEventListener("change", cargarMarcas);
});

// Cambia la marca: se llenan los modelos de esa marca
marca.addEventListener("change", function () {
  const modelos = Object.keys(catalogo[tipoActual()][marca.value]);
  llenar(modeloSelect, modelos, "Seleccione el modelo");
  modeloSelect.disabled = false;
  modeloSelect.classList.remove("is-invalid");
});

// ===== Envío del formulario =====
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const anio = document.getElementById("anioVehiculo").value;
  const modelo = modeloSelect.value;
  const terminos = document.getElementById("terminos").checked;
  let valido = true;

  // Correo
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add("is-invalid");
    valido = false;
  } else {
    email.classList.remove("is-invalid");
  }

  // Teléfono
  if (telefono.value.length !== 10) {
    telefono.classList.add("is-invalid");
    valido = false;
  } else {
    telefono.classList.remove("is-invalid");
  }

  // Nombre
  if (document.getElementById("nombre").value.trim() === "") {
    document.getElementById("nombre").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("nombre").classList.remove("is-invalid");
  }

  // Marca
  if (marca.value === "") {
    marca.classList.add("is-invalid");
    valido = false;
  } else {
    marca.classList.remove("is-invalid");
  }

  // Modelo
  if (modelo === "") {
    modeloSelect.classList.add("is-invalid");
    valido = false;
  } else {
    modeloSelect.classList.remove("is-invalid");
  }

  // Año del vehículo
  if (anio === "") {
    select.classList.add("is-invalid");
    valido = false;
  } else {
    select.classList.remove("is-invalid");
  }

  // Términos y condiciones
  if (!terminos) {
    document.getElementById("terminos").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("terminos").classList.remove("is-invalid");
  }

  if (!valido) {
    return; // detiene el envío si algo falló
  }

  // 1. Calcular la cotización: precio del modelo + recargo por antigüedad
  const tipo = tipoActual();
  const antiguedad = Math.max(0, anioActual - parseInt(anio));
  const precioBase = catalogo[tipo][marca.value][modelo];
  const precio = precioBase + (antiguedad * RECARGO_POR_ANIO);

  // 2. Mostrar en el modal
  document.getElementById("modalDetalle").textContent =
    nombresTipo[tipo] + " " + marca.value + " " + modelo + " " + anio;
  document.getElementById("modalPrecio").textContent =
    "$" + precio.toLocaleString("es-MX");

  const modal = new bootstrap.Modal(document.getElementById("modalCotizacion"));
  modal.show();
});

// ===== Quitar el borde rojo en cuanto el usuario corrige =====
const campos = document.querySelectorAll("#formCotizar input, #formCotizar select");

campos.forEach(function (campo) {
  campo.addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });
  campo.addEventListener("change", function () {
    this.classList.remove("is-invalid");
  });
});

// ===== Animaciones al hacer scroll =====
AOS.init({
  duration: 800,
  // once: true  // anima solo la primera vez que aparece
});

// ===== Carrusel "¿Por qué elegirnos?" =====
// Va dentro de DOMContentLoaded porque el script de Bootstrap (con defer)
// se ejecuta después de este archivo, pero antes de ese evento.
document.addEventListener("DOMContentLoaded", function () {
  const carruselPorque = document.getElementById("carruselPorque");
  const carrusel = bootstrap.Carousel.getOrCreateInstance(carruselPorque);

  // Solo avanza solo si el usuario no pidió reducir el movimiento
  if (!reducirMovimiento) {
    carrusel.cycle();
  }
});