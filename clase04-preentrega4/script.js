let productos = ["manzana", "banana", "pera", "uva", "naranja"];

// agregar al final
let nuevoFinal = prompt("Ingresa un producto para agregar al final");
if (nuevoFinal) {
  productos.push(nuevoFinal);
}

// agregar al principio
let nuevoInicio = prompt("Ingresa un producto para agregar al principio");
if (nuevoInicio) {
  productos.unshift(nuevoInicio);
}

// eliminar el ultimo elemento
let eliminado = productos.pop();
alert("Se ha eliminado el elemento: " + eliminado);

// buscar un producto
let buscado = prompt("Ingresa el nombre del producto a buscar");
if (productos.includes(buscado)) {
  let posicion = productos.indexOf(buscado);
  alert("El producto " + buscado + " se encuentra en la posicion " + posicion);
} else {
  alert("El producto no se encuentra en la lista");
}

// actualizar un producto por indice
let indice = Number(prompt("Ingresa el indice que queres actualizar"));
let nuevoValor = prompt("Ingresa el nuevo valor");
if (!isNaN(indice) && indice >= 0 && indice < productos.length) {
  productos.splice(indice, 1, nuevoValor);
} else {
  alert("Indice invalido");
}

// mostrar todos los productos
function mostrarProductos() {
  for (const producto of productos) {
    console.log("Producto: " + producto);
  }
}

mostrarProductos();
