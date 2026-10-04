const contenedor = document.getElementById("productos")
const mensaje = document.getElementById("mensaje")

function mostrarProductos(productos) {
    contenedor.innerHTML = ""
    productos.forEach(producto => {
        const li = document.createElement("li")
        li.textContent = `${producto.nombre} - $${producto.precio} (stock ${producto.stock})`
        contenedor.appendChild(li)
    })
}

async function cargarProductos() {
    mensaje.textContent = "Cargando productos..."

    try {
        const respuesta = await fetch("./data.json")

        if (!respuesta.ok) {
            throw new Error("Error " + respuesta.status)
        }

        const productos = await respuesta.json()
        mostrarProductos(productos)

        Swal.fire({
            icon: "success",
            title: "Productos cargados con éxito",
            timer: 2000,
            showConfirmButton: false
        })
    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar los productos"
        })
    } finally {
        mensaje.textContent = ""
    }
}

cargarProductos()
