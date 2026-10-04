class Producto {
    constructor(id, nombre, precio, categoria, stock) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.categoria = categoria
        this.stock = stock
    }

    aplicarDescuento(porcentaje) {
        this.precio = this.precio - (this.precio * porcentaje / 100)
    }

    vender(cantidad) {
        if (cantidad > this.stock) {
            throw new Error("No hay stock suficiente")
        }
        this.stock = this.stock - cantidad
    }
}

const productosIniciales = [
    new Producto(1, "Remera", 12000, "Ropa", 10),
    new Producto(2, "Zapatillas", 85000, "Calzado", 5),
    new Producto(3, "Mochila", 30000, "Accesorios", 8),
    new Producto(4, "Gorra", 9000, "Accesorios", 15),
    new Producto(5, "Campera", 60000, "Ropa", 4)
]

const contenedorProductos = document.getElementById("contenedorProductos")
const mensaje = document.getElementById("mensaje")
const aviso = document.getElementById("aviso")
const resumen = document.getElementById("resumen")
const inputNombre = document.getElementById("inputNombre")
const inputPrecio = document.getElementById("inputPrecio")
const inputCategoria = document.getElementById("inputCategoria")
const inputStock = document.getElementById("inputStock")
const inputBuscar = document.getElementById("inputBuscar")
const botonAgregar = document.getElementById("botonAgregar")
const botonReiniciar = document.getElementById("botonReiniciar")

let productos = []

function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(productos))
}

function cargarProductos() {
    const guardados = JSON.parse(localStorage.getItem("productos"))

    if (guardados) {
        productos = guardados.map(item => new Producto(item.id, item.nombre, item.precio, item.categoria, item.stock))
    } else {
        productos = productosIniciales
        guardarProductos()
    }
}

function mostrarMensaje(texto, tipo) {
    mensaje.innerText = texto
    mensaje.className = "mensaje " + tipo
}

function mostrarResumen() {
    const valorTotal = productos.reduce((total, producto) => total + producto.precio * producto.stock, 0)
    resumen.innerText = "Productos: " + productos.length + " | Valor del inventario: $" + valorTotal.toFixed(0)
}

function renderizarProductos(lista) {
    contenedorProductos.innerHTML = ""

    lista.forEach(producto => {
        const tarjeta = document.createElement("div")
        tarjeta.className = "tarjeta"
        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Categoría: ${producto.categoria}</p>
            <p>Precio: $${producto.precio.toFixed(0)}</p>
            <p class="${producto.stock === 0 ? "sin-stock" : ""}">Stock: ${producto.stock}</p>
            <input type="number" min="1" value="1" id="cantidad-${producto.id}">
            <button id="vender-${producto.id}">Vender</button>
        `
        contenedorProductos.appendChild(tarjeta)

        const botonVender = document.getElementById("vender-" + producto.id)
        botonVender.addEventListener("click", () => {
            const inputCantidad = document.getElementById("cantidad-" + producto.id)
            venderProducto(producto.id, parseInt(inputCantidad.value))
        })
    })

    mostrarResumen()
}

function venderProducto(id, cantidad) {
    try {
        const producto = productos.find(item => item.id === id)

        if (!producto) {
            throw new Error("El producto no existe")
        }
        if (isNaN(cantidad) || cantidad <= 0) {
            throw new Error("La cantidad no es válida")
        }

        producto.vender(cantidad)
        guardarProductos()
        mostrarMensaje("Venta realizada: " + cantidad + " x " + producto.nombre, "exito")
    } catch (error) {
        mostrarMensaje("No se pudo procesar la operación, intentá de nuevo. " + error.message, "error")
    } finally {
        renderizarProductos(productos)
    }
}

function agregarProducto() {
    try {
        const nombre = inputNombre.value.trim()
        const precio = parseFloat(inputPrecio.value)
        const categoria = inputCategoria.value.trim()
        const stock = parseInt(inputStock.value)

        if (nombre === "" || categoria === "") {
            throw new Error("Completá el nombre y la categoría")
        }
        if (isNaN(precio) || isNaN(stock) || precio <= 0 || stock < 0) {
            throw new Error("El precio o el stock no son válidos")
        }

        const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1
        productos.push(new Producto(nuevoId, nombre, precio, categoria, stock))
        guardarProductos()
        mostrarMensaje("Producto agregado: " + nombre, "exito")
    } catch (error) {
        mostrarMensaje("No se pudo procesar la operación, intentá de nuevo. " + error.message, "error")
    } finally {
        inputNombre.value = ""
        inputPrecio.value = ""
        inputCategoria.value = ""
        inputStock.value = ""
        renderizarProductos(productos)
    }
}

function mostrarOferta() {
    const productoOferta = productos.find(producto => producto.stock > 0)

    if (!productoOferta) {
        return
    }

    aviso.classList.remove("oculto")
    aviso.innerHTML = `
        <span>Oferta del día: 10% de descuento en ${productoOferta.nombre}</span>
        <button id="botonOferta">Aplicar oferta</button>
    `

    const botonOferta = document.getElementById("botonOferta")
    botonOferta.addEventListener("click", () => {
        productoOferta.aplicarDescuento(10)
        guardarProductos()
        renderizarProductos(productos)
        mostrarMensaje("Descuento aplicado a " + productoOferta.nombre, "exito")
        aviso.classList.add("oculto")
    })
}

botonAgregar.addEventListener("click", agregarProducto)

inputBuscar.addEventListener("keyup", () => {
    const texto = inputBuscar.value.toLowerCase()
    const filtrados = productos.filter(producto => producto.nombre.toLowerCase().includes(texto))
    renderizarProductos(filtrados)
})

botonReiniciar.addEventListener("click", () => {
    localStorage.removeItem("productos")
    productos = [
        new Producto(1, "Remera", 12000, "Ropa", 10),
        new Producto(2, "Zapatillas", 85000, "Calzado", 5),
        new Producto(3, "Mochila", 30000, "Accesorios", 8),
        new Producto(4, "Gorra", 9000, "Accesorios", 15),
        new Producto(5, "Campera", 60000, "Ropa", 4)
    ]
    guardarProductos()
    renderizarProductos(productos)
    mostrarMensaje("Inventario reiniciado", "exito")
})

cargarProductos()
renderizarProductos(productos)

setTimeout(mostrarOferta, 3000)
