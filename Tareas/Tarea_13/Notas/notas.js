document.querySelector("#botonSetTimeout").addEventListener("click", demoSetTimeout);
document.querySelector("#botonCallback").addEventListener("click", demoCallback);
document.querySelector("#botonCrearPromesa").addEventListener("click", demoCrearPromesa);
document.querySelector("#botonThenCatch").addEventListener("click", demoThenCatch);
document.querySelector("#botonMultiple").addEventListener("click", demoMultiple);
document.querySelector("#botonAsyncAwait").addEventListener("click", demoAsyncAwait);
document.querySelector("#botonTryCatchFinally").addEventListener("click", demoTryCatchFinally);
document.querySelector("#botonPromiseAll").addEventListener("click", demoPromiseAll);
document.querySelector("#botonPromiseRace").addEventListener("click", demoPromiseRace);


function demoSetTimeout() {
  console.log("1.-Antes");
  setTimeout(() => console.log("5.-En espera después de 5s"), 5000);
  setTimeout(() => console.log("3.-En espera después de 10ms"), 10);
  setTimeout(() => console.log("4.-En espera después de 30ms"), 30);
  console.log("2.-Después");
}


function fakeRequestCallback(url, sucess, failure) {
  const delay = Math.floor(Math.random() * 3000) + 1000; // 1 a 4s
  setTimeout(() => {
    if (delay <= 2500) {
      sucess(`Respuesta de ${url} tardó ${delay}ms`);
    } else {
      failure(new Error(`Connection timeout para ${url} con ${delay}ms`));
    }
  }, delay);
}


function fakeRequestCallback2(url, sucess, failure) {
  const delay = Math.floor(Math.random() * 3000) + 1000; // 1 a 4s
  setTimeout(() => {
    if (delay <= 2500) {
      sucess(`Si se pudo`);
    } else {
      failure(`Falló`);
    }
  }, delay);
}


function demoCallback() {
  console.log("Probando con callback...");
  fakeRequestCallback2(
    "perritos.com/page1",
    (mensajeRespuesta) => console.log("Exito:", mensajeRespuesta),
    (mensajeError) => console.log("Error:", mensajeError),
  );
}


// Promesas
function fakeRequestPromise(url) {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 3000) + 1000; // 1 a 4s
    setTimeout(() => {
      if (delay <= 1500) {
        resolve(`Respuesta rapidísima de ${url} tardó ${delay}ms`);
      } else if (delay <= 2500) {
        resolve(`Respuesta de ${url} tardó ${delay}ms`);
      } else {
        reject(new Error(`Connection timeout para ${url} con ${delay}ms`));
      }
    }, delay);
  });
}


function demoCrearPromesa() {
  console.log("Creando y llamando a la promesa...");
  const promesa = fakeRequestPromise("perritos.com/page10");
  console.log(`La página respondió: ${promesa}`);
}


// con Then y catch
function demoThenCatch() {
  console.log("Llamando con then y catch...");
  fakeRequestPromise("perritos.com/page11")
    .then((mensaje) => console.log(`Recibí de respuesta: ${mensaje}`))
    .catch((mensaje) => console.log(`Falló, mensaje de error: ${mensaje}`));
}


function demoMultiple() {
  console.log("Llamando múltiples páginas...");
  fakeRequestPromise("perritos.com/01")
    .then((mensaje) => {
      console.log(`Recibí de respuesta: ${mensaje}`);
      return fakeRequestPromise("perritos.com/02");
    })
    .then((mensaje) => {
      console.log(`Recibí de respuesta: ${mensaje}`);
      return fakeRequestPromise("perritos.com/03");
    })
    .then((mensaje) => {
      console.log(`Recibí de respuesta: ${mensaje}`);
    })
    .catch((mensaje) => console.log(`Falló, mensaje de error: ${mensaje}`));
}


async function demoAsyncAwait() {
  console.log("Probando con async/await");
  console.time("secuencial");
  const data1 = await fakeRequestPromise("gatitos.com/page01");
  console.log(data1);
  const data2 = await fakeRequestPromise("gatitos.com/page02");
  console.log(data2);
  console.timeEnd("secuencial");
}


async function demoTryCatchFinally() {
  console.log("Probando ambas páginas");
  try {
    const data1 = await fakeRequestPromise("gatitos.com/page01");
    console.log(data1);
    const data2 = await fakeRequestPromise("gatitos.com/page02");
    console.log(data2);
    const data3 = await fakeRequestPromise("gatitos.com/page03");
    console.log(data3);
  } catch {
    console.log("Alguna página falló");
  } finally {
    console.log("Listo para continuar...");
  }
}


async function demoPromiseAll() {
  console.log("Probando promise all");
  console.time("Promise_all");
  try {
    const [a, b] = await Promise.all([fakeRequestPromise("all.com/01"), fakeRequestPromise("all.com/02")]);
    console.log(a);
    console.log(b);
  } catch (error) {
    console.log(`Alguna falló ${error}`);
  } finally {
    console.timeEnd("Promise_all");
  }
}


function crearPromesaConDelay(nombre, ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(nombre), ms);
  });
}


async function demoPromiseRace() {
  console.log("Probando carrera");


  const lenta = crearPromesaConDelay("lenta", 5000);
  const rapida = crearPromesaConDelay("rápida", 2000);


  const ganadora = await Promise.race([lenta, rapida]);
  console.log(`Ganó ${ganadora}`);
}
