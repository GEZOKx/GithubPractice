// Generar opciones de años para el select
const select = document.getElementById("anioVehiculo");
const anioActual = new Date().getFullYear();

for (let anio = anioActual + 1; anio >= anioActual - 30; anio--) {
  const opcion = document.createElement("option");
  opcion.value = anio;
  opcion.textContent = anio;
  select.appendChild(opcion);
}

const form = document.getElementById("formCotizar");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");

// Teléfono: solo números mientras escribe
telefono.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

// Correo: validar al salir del campo
email.addEventListener("blur", function () {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
    this.classList.remove("is-invalid");
  } else {
    this.classList.add("is-invalid");
  }
});

// Envío del formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const anio = document.getElementById("anioVehiculo").value;
  const terminos = document.getElementById("terminos").checked;
  let valido = true;

  // repetir validaciones de email y teléfono
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add("is-invalid");
    valido = false;
  } else {
    email.classList.remove("is-invalid");
  }

  if (document.getElementById("telefono").value.length !== 10) {
    document.getElementById("telefono").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("telefono").classList.remove("is-invalid");
  }

  if (document.getElementById("nombre").value.trim() === "") {
    document.getElementById("nombre").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("nombre").classList.remove("is-invalid");
  }

  if (document.getElementById("VehiculoMarca").value.trim() === "") {
    document.getElementById("VehiculoMarca").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("VehiculoMarca").classList.remove("is-invalid");
  }

  if (document.getElementById("VehiculoModelo").value.trim() === "") {
    document.getElementById("VehiculoModelo").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("VehiculoModelo").classList.remove("is-invalid");
  }
  
  
  // anio del vehículo
const selectAnio = document.getElementById("anioVehiculo");
if (anio === "") {
  selectAnio.classList.add("is-invalid");
  valido = false;
} else {
  selectAnio.classList.remove("is-invalid");
}

  // términos y condiciones
  if (!document.getElementById("terminos").checked) {
    document.getElementById("terminos").classList.add("is-invalid");
    valido = false;
  } else {
    document.getElementById("terminos").classList.remove("is-invalid");
  }

  if (!valido) {
    return; // detiene el envío si algo falló
  }

  // Aquí irá el cálculo de la cotización
const resultado = document.getElementById("resultado");

const tipo = document.querySelector('input[name="btnradio"]:checked').value;
const antiguedad = Math.max(0, anioActual - parseInt(anio));

const base = { auto: 11000, pickup: 25000, moto: 8000 };
let precio = base[tipo] + (antiguedad * 100); // recargo por año

resultado.innerHTML =
  '<div class="alert alert-success">Su cotización estimada es de <strong>$' +
  precio.toLocaleString("es-MX") + '</strong> al año.</div>';
});

// Cambiar placeholder de marca según tipo de vehículo
const radios = document.querySelectorAll('input[name="btnradio"]');
const marca = document.getElementById("VehiculoMarca");

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

AOS.init({
  duration: 800, // animacion we
  // once: true     anima solo la primera vez que aparece, de momento la dejo asi
});