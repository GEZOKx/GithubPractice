const select = document.getElementById("anioVehiculo");
const anioActual = new Date().getFullYear();

for (let anio = anioActual + 1; anio >= anioActual - 30; anio--) {
  const opcion = document.createElement("option");
  opcion.value = anio;
  opcion.textContent = anio;
  select.appendChild(opcion);
}

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
  duration: 800, // cuánto dura la animación, en milisegundos
  once: true     // anima solo la primera vez que aparece
});