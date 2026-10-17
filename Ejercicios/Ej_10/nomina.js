// ============================================================
// Súper Fresco — Nómina de empleados
// ============================================================

class Empleado {
  constructor(nombre, puesto, salarioBase, anioContratacion) {
    this.nombre = nombre;
    this.puesto = puesto;
    this.salarioBase = salarioBase;
    this.anioContratacion = anioContratacion;
  }

  aumentarSalario(porcentaje) {
    if (porcentaje <= 0) {
      throw new Error("El porcentaje debe ser mayor a 0");
    }
    this.salarioBase = this.salarioBase + this.salarioBase * (porcentaje / 100);
  }

  calcularAntiguedad() {
    const anioActual = new Date().getFullYear();
    return anioActual - this.anioContratacion;
  }

  // MEMENTO - El originador debe poder guardar su estado. 
  // Regresa una copia del estado que se quiere poder restaurar después
  guardarEstado() {
    return { salarioBase: this.salarioBase };
  }

  // MEMENTO - El originador debe poder restaurar su estado.
  // Reemplaza el estado actual por uno guardado antes que recibe como parámetro
  restaurarEstado(snapshot) {
    this.salarioBase = snapshot.salarioBase;
  }
}

// Plantilla de personal (dada, no se modifica su tamaño)
let empleados = [
  new Empleado("Marta", "cajera", 8000, 2022),
  new Empleado("Luis", "gerente", 15000, 2013),
  new Empleado("Ana", "cajera", 8200, 2024),
  new Empleado("Carlos", "reponedor", 7500, 2023),
  new Empleado("Sofía", "gerente", 15500, 2011),
  new Empleado("Pedro", "cajero", 7800, 2020),
  new Empleado("Diana", "reponedora", 7600, 2019),
  new Empleado("Jorge", "supervisor", 11000, 2017),
  new Empleado("Valeria", "cajera", 8100, 2025),
  new Empleado("Miguel", "reponedor", 7700, 2021),
];

//  MEMENTO - Aquí se van guardando las fotos del estado de los empleados
let historial_memento = [];

// 1. Imprime cada empleado en la consola mediante un ForEach.
//    Formato exacto: "nombre puesto - antigüedad", ej: "Marta cajera - 4"
// antigüedad ya está implementado, es empleado.calcularAntiguedad()
function mostrarEmpleados() 
{
  empleados.forEach((empleado) => 
    {
    console.log(`${empleado.nombre} ${empleado.puesto} - ${empleado.calcularAntiguedad()}`);
    });
}

// 2. Regresa un arreglo nuevo con nombre y bono de cada empleado con Map.
//    bono = 10% del salario base, +1% extra por cada año de antigüedad,
//    con un tope de 10 años de antigüedad para este cálculo
//    (aunque alguien lleve 15 años, el bono se calcula como si llevara 10).
// antigüedad ya está implementado, es empleado.calcularAntiguedad()
function listarConBono() 
{
  return empleados.map((empleado) => 
    {
      const antiguedad = empleado.calcularAntiguedad();
      const bono = empleado.salarioBase * (0.10 + 0.01 * Math.min(antiguedad, 10));
      return { nombre: empleado.nombre, bono };
    });
}

// 3. Regresa solo los empleados cuyo puesto contiene el texto buscado,
//    sin distinguir mayúsculas/minúsculas (ej. "gEr" encuentra "gerente") pueden usar toLowerCase().
//    Usa filter para encontrar aquellos que incluyan el texto.
function filtrarPorPuesto(puesto) {
  return empleados.filter((empleado) => empleado.puesto.toLowerCase().includes(puesto.toLowerCase()));
}

// 4. Suma el salario base de todos los empleados. Usa reduce.
// el acumulador debe iniciar en 0, y se le va sumando el salario de cada empleado
function calcularNomina() 
{
  return empleados.reduce((total, empleado) => total + empleado.salarioBase, 0);
}

// 5a. Guarda en historial_memento una foto del empleado en ese índice,
//     usando guardarEstado(), antes de modificarlo.
//     Se debe guardar en el historial LIFO 
function guardarMemento(indice) { 
  historial_memento.push(empleados[indice].guardarEstado());
}

// 5b. Saca la última foto de historial_memento, si existe
//     revisa el índice de la última foto y busca al empleado guardado
//     una vez con el empleado llamamos a restaurarEstado("estado de última foto")
function deshacerMemento() {
  if (historial_memento.length > 0) {
    const ultimoEstado = historial_memento.pop();
    // Aquí se debería restaurar el estado del empleado, pero necesitamos el índice

  }
}

// ============================================================
// A partir de aquí solo es DOM, para que la página se vea y
// se pueda probar a mano. Esto NO es lo que se revisa.
// ============================================================

function actualizarVistaEmpleados() {
  const lista = document.getElementById("listaEmpleados");
  lista.innerHTML = "";
  empleados.forEach((empleado, indice) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <button data-indice="${indice}" class="btnAumentar">+5%</button>
      <strong>${empleado.nombre}</strong> — ${empleado.puesto}<br>
      Salario: $${empleado.salarioBase.toFixed(2)} · Antigüedad: ${empleado.calcularAntiguedad()} años
    `;
    lista.appendChild(li);
  });

  document.getElementById("nomina").textContent = `$${calcularNomina().toFixed(2)}`;

  const consola = document.getElementById("consolaEmpleados");
  consola.innerHTML = empleados
    .map((empleado) => `${empleado.nombre} ${empleado.puesto} - ${empleado.calcularAntiguedad()}`)
    .join("<br>");
}

function manejarAumentar(indice) {
  guardarMemento(indice);
  try {
    empleados[indice].aumentarSalario(5);
  } catch (error) {
    alert(error.message);
  }
  actualizarVistaEmpleados();
}

function manejarDeshacer() {
  deshacerMemento();
  actualizarVistaEmpleados();
}

function manejarFiltrar() {
  const puesto = document.getElementById("inputPuesto").value.trim();
  const resultado = puesto ? filtrarPorPuesto(puesto) : empleados;
  const resultadoEl = document.getElementById("resultadoFiltro");
  resultadoEl.textContent = resultado.length
    ? resultado.map((e) => e.nombre).join(", ")
    : "Sin resultados";
}

function manejarVerBonos() {
  const bonos = listarConBono();
  const resultadoEl = document.getElementById("resultadoBonos");
  resultadoEl.textContent = bonos
    .map((b) => `${b.nombre}: $${b.bono.toFixed(2)}`)
    .join(" · ");
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarVistaEmpleados();
  mostrarEmpleados(); // se ve en la consola del navegador

  document.getElementById("listaEmpleados").addEventListener("click", (evento) => {
    if (evento.target.classList.contains("btnAumentar")) {
      manejarAumentar(parseInt(evento.target.dataset.indice));
    }
  });
});
