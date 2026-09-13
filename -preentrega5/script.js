class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  aplicarDescuento(porcentaje) {
    this.precio = this.precio - (this.precio * porcentaje) / 100;
  }

  vender(cantidad) {
    if (cantidad <= this.stock) {
      this.stock -= cantidad;
      console.log("Se vendieron " + cantidad + " unidades de " + this.nombre);
    } else {
      console.log("No hay stock suficiente de " + this.nombre);
    }
  }
}

const producto1 = new Producto(1, "manzana", 500, 50);
const producto2 = new Producto(2, "banana", 300, 30);
const producto3 = new Producto(3, "pera", 450, 20);

let productos = [producto1, producto2, producto3];


let nuevoNombre = prompt("Ingresa el nombre de un nuevo producto");
if (nuevoNombre) {
  let nuevoPrecio = Number(prompt("Ingresa el precio del producto"));
  let nuevoStock = Number(prompt("Ingresa el stock del producto"));
  let nuevoProducto = new Producto(productos.length + 1, nuevoNombre, nuevoPrecio, nuevoStock);
  productos.push(nuevoProducto);
}


producto2.vender(10);


producto1.aplicarDescuento(20);


let buscado = prompt("Ingresa el nombre del producto a buscar");
let encontrado = null;
for (const producto of productos) {
  if (producto.nombre === buscado) {
    encontrado = producto;
  }
}
if (encontrado) {
  alert(
    "El producto " +
      encontrado.nombre +
      " tiene un precio de $" +
      encontrado.precio +
      " y stock de " +
      encontrado.stock
  );
} else {
  alert("El producto no se encuentra en la lista");
}


function mostrarProductos() {
  for (const producto of productos) {
    console.log(
      "ID: " +
        producto.id +
        " - " +
        producto.nombre +
        " - Precio: $" +
        producto.precio +
        " - Stock: " +
        producto.stock
    );
  }
}

mostrarProductos();
