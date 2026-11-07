// =====================================================================
// AJAX, API, JSON y fetch
// =====================================================================


const API = "https://jsonplaceholder.typicode.com";


// ---------- utilidades para mostrar en la pantalla ----------
function imprimir(id, valor) {
  document.querySelector("#" + id).textContent =
    typeof valor === "string" ? valor : JSON.stringify(valor, null, 2);
}


function imprimirError(id, error) {
  imprimir(id, "Falló: " + error.message);
}


// =====================================================================
// 1. fetch básico
// =====================================================================
document.querySelector("#btn-1").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/users`);
    imprimir("out-1", {
      "¿qué es response?": "un objeto Response, NO los datos todavía",
      ok: response.ok,
      status: response.status,
    });
  } catch (error) {
    imprimirError("out-1", error);
  }
});


// =====================================================================
// 2. response.json() es otra promesa
// =====================================================================
document.querySelector("#btn-2").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/users/1`);
    imprimir("out-2", "response.ok = " + response.ok + " (todavía no son datos)");
    const data = await response.json(); // segunda promesa
    imprimir("out-2", { "response.status": response.status, "después de json()": data});
  } catch (error) {
    imprimirError("out-2", error);
  }
});


// =====================================================================
// 3. Revisando response.ok (el error "silencioso")
// =====================================================================
document.querySelector("#btn-3").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/users/9999`); // no existe -> 404
    // Sin revisar response.ok, esto NO lanza ningún error:
    const data = await response.json();
    imprimir("out-3", {
      "fetch lanzó error?": "NO - la promesa resolvió normalmente",
      ok: response.ok,
      status: response.status,
      "lo que llegó (no son los datos que esperábamos)": data,
    });
  } catch (error) {
    imprimirError("out-3", error);
  }
});


// =====================================================================
// 4. Lanzando un Error a mano cuando !response.ok
// =====================================================================
document.querySelector("#btn-4").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/users/9999`);
    if (!response.ok) {
      throw new Error(`Error ${response.status} al pedir el usuario`);
    }
    const data = await response.json();
    imprimir("out-4", data);
  } catch (error) {
    imprimir("out-4", "Error capturado correctamente: " + error.message);
  }
});


// =====================================================================
// 5. JSON anidado
// =====================================================================
document.querySelector("#btn-5").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/users`);
    const usuarios = await response.json();
    const usuario = usuarios[0];
    imprimir("out-5", {
      "usuario.name": usuario.name,
      "usuario.company.name (2 niveles)": usuario.company.name,
      "usuario.address.geo.lat (3 niveles)": usuario.address.geo.lat,
    });
  } catch (error) {
    imprimirError("out-5", error);
  }
});


// =====================================================================
// 6. Calcular sobre un arreglo de objetos
// =====================================================================
function porcentajeCompletado(tareas) {
  if (!tareas || tareas.length === 0) return null;
  const hechas = tareas.filter((t) => t.completed).length;
  return (hechas / tareas.length) * 100;
}


// Promedio con reduce: suma todos los valores y divide entre la cantidad.
// geo.lat viene como texto en el JSON, por tenemos que convertirlo con Number().
function promedioLatitud(usuarios) {
  if (!usuarios || usuarios.length === 0) return null;
  const suma = usuarios.reduce((total, u) => total + Number(u.address.geo.lat), 0);
  return suma / usuarios.length;
}


// convirtiendo texto a porcentaje; toFixed(n) deja n decimales, si es null lo hacemos texto.
function textoPorcentaje(tareas) {
  const porcentaje = porcentajeCompletado(tareas);
  return porcentaje === null ? "Sin tareas" : `${porcentaje.toFixed(0)}% completado`;
}


document.querySelector("#btn-6").addEventListener("click", async () => {
  try {
    const tareasPorUsuario = [];
    for (const id of [1, 2, 13, 27, 99]) {
      const response = await fetch(`${API}/todos?userId=${id}`);
      const tareas = await response.json();
      tareasPorUsuario.push({ userId: id, tareas: tareas.length, texto: textoPorcentaje(tareas) });
    }
    const responseUsuarios = await fetch(`${API}/users`);
    const usuarios = await responseUsuarios.json();
    imprimir("out-6", {
      "tareas por usuario": tareasPorUsuario,
      "latitud promedio (reduce + toFixed)": promedioLatitud(usuarios).toFixed(2),
      "promedio de un arreglo vacío": promedioLatitud([]),
    });
  } catch (error) {
    imprimirError("out-6", error);
  }
});


// =====================================================================
// 7. Pintando una lista en el DOM
// =====================================================================
// La imagen es una URL normal regresa una foto distinta según el
// valor de ?u= (aquí usamos el id del usuario).
// https://pravatar.cc/ tiene opción de elegir el tamaño, vamos a usarla
function crearTarjetaUsuario(usuario) {
  const li = document.createElement("li");


  const img = document.createElement("img");
  img.src = "https://i.pravatar.cc/40?u=" + usuario.id; // la URL de la imagen
  img.alt = usuario.name; // texto alternativo (accesibilidad)


  const nombre = document.createElement("div");
  nombre.textContent = usuario.name;


  const detalle = document.createElement("div");
  detalle.textContent = `${usuario.email} · ${usuario.address.city} · ${usuario.company.name}`;


  const info = document.createElement("div");
  info.append(nombre, detalle);


  li.append(img, info);
  return li;
}


//buscamos la lista y agregamos el usuario
function pintarUsuarios(usuarios) {
  const lista = document.querySelector("#lista-usuarios");
  lista.textContent = "";
  usuarios.forEach((usuario) => lista.appendChild(crearTarjetaUsuario(usuario)));
}


document.querySelector("#btn-7").addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/users`);
    pintarUsuarios(await response.json());
  } catch (error) {
    document.querySelector("#lista-usuarios").textContent = "Falló: " + error.message;
  }
});


// =====================================================================
// 8. Query string
// =====================================================================
document.querySelector("#btn-8").addEventListener("click", async () => {
  const texto = document.querySelector("#input-user-id").value.trim();
  const url = `${API}/todos?userId=${encodeURIComponent(texto)}`;
  imprimir("out-8", "URL generada: " + url);
  try {
    const response = await fetch(url);
    const tareas = await response.json();
    imprimir("out-8", {
      url,
      "tareas encontradas": tareas.length,
      primera: tareas[0] || "(ninguna)",
    });
  } catch (error) {
    imprimirError("out-8", error);
  }
});


// =====================================================================
// 9. async/await + try/catch/finally: todo el proceso en una función
// =====================================================================
async function cargarUsuarios(url) {
  const estadoEl = document.querySelector("#estado-9");
  estadoEl.textContent = "Cargando...";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error ${response.status} al cargar los usuarios`);
    }
    const usuarios = await response.json();
    pintarUsuarios(usuarios);
    estadoEl.textContent = `Listo: ${usuarios.length} usuario(s) cargado(s) (ver la lista de la demo 7).`;
  } catch (error) {
    estadoEl.textContent = "Error: " + error.message;
  } finally {
    console.log("finally: esto corre siempre, haya salido bien o mal.");
  }
}


document.querySelector("#btn-9a").addEventListener("click", () => cargarUsuarios(`${API}/users`));
// Podemos ver un error de red si ponemos un dominio que no existe
// La promesa de fetch se RECHAZA.
document
  .querySelector("#btn-9b")
  .addEventListener("click", () => cargarUsuarios("https://dominio-que-no-existe.invalid/users"));
