class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}


const productosIniciales = [
    new Producto(1, "Teclado mecánico", 45000),
    new Producto(2, "Mouse inalámbrico", 22000),
    new Producto(3, "Monitor 24''", 180000)
];


const guardados = JSON.parse(localStorage.getItem("productos")) ?? productosIniciales;

let productos = guardados.map(({ id, nombre, precio }) => new Producto(id, nombre, precio));

let idProximo = productos.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;
let idEditando = null;


const formulario = document.querySelector("#formulario");
const nombreInput = document.querySelector("#nombreInput");
const precioInput = document.querySelector("#precioInput");
const botonForm = document.querySelector("#botonForm");
const buscador = document.querySelector("#buscador");
const contenedor = document.querySelector("#contenedor-items");
const mensaje = document.querySelector("#mensaje");
const total = document.querySelector("#total");
const botonVaciar = document.querySelector("#vaciar");


const guardarProductos = () => {
    localStorage.setItem("productos", JSON.stringify(productos));
};

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
        const { id, nombre, precio } = producto;

        contenedor.innerHTML += `
            <div class="producto">
                <div>
                    <h3>${nombre}</h3>
                    <p>$${precio.toLocaleString("es-AR")}</p>
                </div>
                <div>
                    <button class="editar" data-id="${id}">Editar</button>
                    <button class="eliminar" data-id="${id}">Eliminar</button>
                </div>
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

    if (idEditando === null) {
        productos.push(new Producto(idProximo, nombre, precio));
        idProximo++;
        mostrarMensaje(`Se agregó "${nombre}" a la lista`, "ok");
    } else {
        const producto = productos.find((p) => p.id === idEditando);
        producto.nombre = nombre;
        producto.precio = precio;
        idEditando = null;
        botonForm.textContent = "+ Agregar";
        mostrarMensaje(`Se modificó "${nombre}"`, "ok");
    }

    guardarProductos();

    nombreInput.value = "";
    precioInput.value = "";
    buscador.value = "";
    nombreInput.focus();

    renderizar(productos);
});


contenedor.addEventListener("click", (event) => {
    const id = Number(event.target.dataset.id);

    if (event.target.classList.contains("eliminar")) {
        const producto = productos.find((p) => p.id === id);

        productos = productos.filter((p) => p.id !== id);
        guardarProductos();

        renderizar(productos);
        mostrarMensaje(`Se eliminó "${producto?.nombre}"`, "ok");
    }

    if (event.target.classList.contains("editar")) {
        const { nombre, precio } = productos.find((p) => p.id === id);

        nombreInput.value = nombre;
        precioInput.value = precio;
        idEditando = id;
        botonForm.textContent = "Guardar cambios";
        nombreInput.focus();
    }
});


buscador.addEventListener("input", (event) => {
    const texto = event.target.value.toLowerCase();
    const filtrados = productos.filter((p) => p.nombre.toLowerCase().includes(texto));
    renderizar(filtrados);
});


botonVaciar.addEventListener("click", () => {
    productos = [];
    localStorage.removeItem("productos");
    idEditando = null;
    botonForm.textContent = "+ Agregar";

    renderizar(productos);
    mostrarMensaje("Se vació la lista", "ok");
});

renderizar(productos);
