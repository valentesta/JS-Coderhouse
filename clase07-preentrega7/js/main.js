 
class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}


let productos = [
    new Producto(1, "Teclado mecánico", 45000),
    new Producto(2, "Mouse inalámbrico", 22000),
    new Producto(3, "Monitor 24''", 180000)
];

let idProximo = 4;


const formulario = document.querySelector("#formulario");
const nombreInput = document.querySelector("#nombreInput");
const precioInput = document.querySelector("#precioInput");
const buscador = document.querySelector("#buscador");
const contenedor = document.querySelector("#contenedor-items");
const mensaje = document.querySelector("#mensaje");
const total = document.querySelector("#total");


const mostrarMensaje = (texto, tipo) => {
    mensaje.textContent = texto;
    mensaje.className = "mensaje " + tipo;
};


const renderizar = (lista) => {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="vacio">No hay productos para mostrar</p>`;
    }

    lista.forEach((producto) => {
        contenedor.innerHTML += `
            <div class="producto">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio.toLocaleString("es-AR")}</p>
                </div>
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>
            </div>
        `;
    });

   
    const suma = lista.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    total.textContent = "Total: $" + suma.toLocaleString("es-AR");
};


formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = nombreInput.value.trim();
    const precio = Number(precioInput.value);

    if (nombre === "" || precio <= 0) {
        mostrarMensaje("Tenés que completar el nombre y un precio mayor a 0", "error");
        return;
    }

    const nuevo = new Producto(idProximo, nombre, precio);
    idProximo++;
    productos.push(nuevo);

    nombreInput.value = "";
    precioInput.value = "";
    buscador.value = "";
    nombreInput.focus();

    renderizar(productos);
    mostrarMensaje(`Se agregó "${nombre}" a la lista`, "ok");
});


contenedor.addEventListener("click", (event) => {
    if (event.target.classList.contains("eliminar")) {
        const id = Number(event.target.dataset.id);
        const producto = productos.find((p) => p.id === id);

        productos = productos.filter((p) => p.id !== id);

        renderizar(productos);
        mostrarMensaje(`Se eliminó "${producto.nombre}"`, "ok");
    }
});


buscador.addEventListener("input", (event) => {
    const texto = event.target.value.toLowerCase();
    const filtrados = productos.filter((p) => p.nombre.toLowerCase().includes(texto));
    renderizar(filtrados);
});

renderizar(productos);
