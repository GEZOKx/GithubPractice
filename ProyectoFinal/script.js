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
const marca = document.getElementById("VehiculoMarca");

const nombresTipo = { auto: "Auto/SUV", pickup: "Pickup", moto: "Motocicleta" };

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

// ===== Envío del formulario =====
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const anio = document.getElementById("anioVehiculo").value;
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
  if (marca.value.trim() === "") {
    marca.classList.add("is-invalid");
    valido = false;
  } else {
    marca.classList.remove("is-invalid");
  }

  // Modelo
  if (document.getElementById("VehiculoModelo").value.trim() === "") {
    document.getElementById("VehiculoModelo").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("VehiculoModelo").classList.remove("is-invalid");
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

  // 1. Calcular la cotización
  const tipo = document.querySelector('input[name="btnradio"]:checked').value;
  const antiguedad = Math.max(0, anioActual - parseInt(anio));

  const base = { auto: 11000, pickup: 25000, moto: 8000 };
  let precio = base[tipo] + (antiguedad * 100); // recargo por año

  // 2. Mostrar en el modal
  const modelo = document.getElementById("VehiculoModelo").value.trim();

  document.getElementById("modalDetalle").textContent =
    nombresTipo[tipo] + " " + marca.value.trim() + " " + modelo + " " + anio;
  document.getElementById("modalPrecio").textContent =
    "$" + precio.toLocaleString("es-MX");

  const modal = new bootstrap.Modal(document.getElementById("modalCotizacion"));
  modal.show();
});

// ===== Cambiar placeholder de marca según tipo de vehículo =====
const radios = document.querySelectorAll('input[name="btnradio"]');

radios.forEach(function (radio) {
  radio.addEventListener("change", function () {
    if (this.value === "auto") {
      marca.placeholder = "Ej. Toyota, Nissan, Mazda";
    } else if (this.value === "pickup") {
      marca.placeholder = "Ej. Ford, Chevrolet, Ram";
    } else {
      marca.placeholder = "Ej. Honda, Yamaha, Suzuki";
    }
  });
});

// ===== Quitar el borde rojo en cuanto el usuario corrige =====
const campos = document.querySelectorAll("#formCotizar input, #formCotizar select");

campos.forEach(function (campo) {
  campo.addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });
});

// ===== Animaciones al hacer scroll =====
AOS.init({
  duration: 800,
  // once: true  // anima solo la primera vez que aparece
});