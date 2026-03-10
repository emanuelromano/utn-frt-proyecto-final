// Chequea si hay una sesion de admin activa
function verificarSesionAdmin() {
    let login = localStorage.getItem("adminLogueado")

    if (login !== "true") {
        window.open("iniciar-sesion.html", "_self")
    }
}


// Mostrar nombre y apellido de usuario
function mostrarUsuarioAdmin() {
    let nombre = localStorage.getItem("adminNombre")
    let apellido = localStorage.getItem("adminApellido")

    if (nombre) {
        document.getElementById("admin-nombre").innerText =
            nombre + " " + apellido
    }
}


// Cerrar sesion eliminando la variable del localStorage
function cerrarSesion() {
    localStorage.removeItem("adminLogueado")
    localStorage.removeItem("adminNombre")
    localStorage.removeItem("adminApellido")

    window.open("iniciar-sesion.html", "_self")
}


// Agregar producto a la base de datos
function agregarProducto() {
    const boton = document.getElementById("btn-agregar-producto")

    // Evitar doble click
    if (boton.disabled) return
    boton.disabled = true

    let formData = new FormData()

    let nombre = document.getElementById('nombre').value.trim()
    let imagen = document.getElementById('urlImagen').value.trim()
    let descripcion = document.getElementById('descripcion').value.trim()

    let porciones = document.getElementById('porciones').value.trim()
    let precio = document.getElementById('precio').value.trim()

    // Validación básica
    if (nombre === "") {
        alert("Debe ingresar un nombre de producto.")
        boton.disabled = false
        return
    }

    // Generar URL limpia
    let url = nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")

    // Valores por defecto
    if (porciones === "") porciones = 0
    if (precio === "") precio = 0

    // Convertir a número
    porciones = parseInt(porciones)
    precio = parseFloat(precio)

    // Evitar negativos
    porciones = Math.max(0, porciones)
    precio = Math.max(0, precio)

    formData.append('nombre', nombre)
    formData.append('url', url)
    formData.append('imagen', imagen)
    formData.append('descripcion', descripcion)
    formData.append('porciones', porciones)
    formData.append('precio', precio)
    formData.append('activo', 1)

    fetch(api + '/productos', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error()
        })
        .then(data => {

            alert('Producto agregado correctamente.')

            // Limpiar formulario
            document.getElementById('nombre').value = ""
            document.getElementById('urlImagen').value = ""
            document.getElementById('descripcion').value = ""
            document.getElementById('porciones').value = ""
            document.getElementById('precio').value = ""

        })
        .catch(error => {
            alert('Error al agregar el producto.')
        })
        .finally(() => {
            // Reactivar botón
            boton.disabled = false
        })
}


// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', async function () {
    //await cargarConfiguracionAPI()
    await apiReady

    verificarSesionAdmin()
    mostrarUsuarioAdmin()
})


// Ocultar elementos del Nav Bar en modo para moviles
function menuHamburguesa() {
    let menuItemDisplay = window.getComputedStyle(document.querySelector('#menu-item-1')).display

    if (menuItemDisplay === "flex") {
        document.getElementById("menu-item-1").style.display = "none"
        document.getElementById("menu-item-2").style.display = "none"
        document.getElementById("menu-item-3").style.display = "none"
        //document.getElementById("menu-item-4").style.display = "none"
    } else if (menuItemDisplay === "none") {
        document.getElementById("menu-item-1").style.display = "flex"
        document.getElementById("menu-item-2").style.display = "flex"
        document.getElementById("menu-item-3").style.display = "flex"
        //document.getElementById("menu-item-4").style.display = "flex"
    }
}