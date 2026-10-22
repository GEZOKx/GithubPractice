const productsList = document.querySelector("#products-list");
const searchInput = document.querySelector("#search-input");
const favCount = document.querySelector("#fav-count");

const addProductForm = document.querySelector("#add-product-form");
const newProductNameInput = document.querySelector("#new-product-name");
const newProductCategorySelect = document.querySelector("#new-product-category");
const categoryPreview = document.querySelector("#category-preview");
const addProductError = document.querySelector("#add-product-error");

let selectedProduct = null;

const nombresCategorias = {
  frutas: "Frutas y verduras",
  lacteos: "Lácteos",
  panaderia: "Panadería",
  bebidas: "Bebidas",
  abarrotes: "Abarrotes",
};

// 1. Crea una función createProductItem(nombre, categoria) que construya y
//    regrese un <li> con la misma estructura que los productos que ya están
//    pintados en el HTML (clase "producto cat-<categoria>", el nombre, el
//    badge de categoría con su texto, y el botón de favorito "♡").
function createProductItem(nombre, categoria) {
  const li = document.createElement("li");
  li.classList.add("producto", `cat-${categoria}`);
  li.innerHTML = `
    <span class="nombre">${nombre}</span>
    <span class="badge">${nombresCategorias[categoria]}</span>
    <button class="btn-favorito">♡</button>
  `;
  return li;
}

// 2. Crea una función selectProduct(li) que le quite la clase "selected" al
//    producto que estaba seleccionado antes (si había uno) y se la ponga al
//    producto nuevo.

// 3. Crea una función toggleFavorite(li, btn) que alterne (toggle) la clase
//    "favorito" en el producto, cambie el texto del botón entre "♡" y "♥",
//    y actualice #fav-count contando cuántos .producto.favorito hay en total.

// 4. Agrega UN SOLO listener de click en #products-list (delegación): si el
//    clic fue en el botón ".btn-favorito" llama a toggleFavorite; si fue en
//    cualquier otra parte de la tarjeta, llama a selectProduct. Debe
//    funcionar también en los productos que se agreguen después.

// 5. Agrega un listener de keydown en document: si hay un producto
//    seleccionado y la tecla presionada es "f" (sin importar mayúscula o
//    minúscula), llama a toggleFavorite sobre ese producto. No debe
//    activarse si el usuario está escribiendo dentro de un input o textarea.

// 6. Agrega un listener de change en el select de categoría que actualice
//    el texto y la clase de #category-preview para reflejar la categoría
//    que se acaba de elegir.

// 7. Agrega un listener de submit en el formulario de alta de productos que
//    use preventDefault, lea el nombre (sin espacios al inicio/final), y
//    revise si ya existe un producto con ese nombre exacto entre los que ya
//    están pintados (sin importar mayúsculas/minúsculas). Si ya existe,
//    muestra el mensaje de error en #add-product-error y no continúes.

// 8. Si el nombre es válido, crea el producto con createProductItem y
//    agrégalo a la lista, limpia el formulario, y regresa la vista previa
//    de categoría a su valor por defecto.

// 9. Agrega un listener de input en el campo de nombre nuevo que oculte el
//    mensaje de error en cuanto el usuario vuelva a escribir.

// 10. Agrega un listener de input en el buscador que oculte (clase
//     "oculto") los productos cuyo nombre no incluya el texto buscado, sin
//     importar mayúsculas o minúsculas.
