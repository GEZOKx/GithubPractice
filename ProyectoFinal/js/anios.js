const select = document.getElementById("anioVehiculo");
const anioActual = new Date().getFullYear();

for (let anio = anioActual + 1; anio >= anioActual - 30; anio--) {
  const opcion = document.createElement("option");
  opcion.value = anio;
  opcion.textContent = anio;
  select.appendChild(opcion);
}