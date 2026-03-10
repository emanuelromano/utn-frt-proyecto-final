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


function formatearCupon(input) {
    let valor = input.value

    // convertir a mayúsculas
    valor = valor.toUpperCase()

    // eliminar todo lo que no sea A-Z o 0-9
    valor = valor.replace(/[^A-Z0-9]/g, "")

    input.value = valor
}


function soloEnteros(input) {
    // eliminar cualquier cosa que no sea número
    input.value = input.value.replace(/[^0-9]/g, "")

}


// Agregar cupón a la base de datos
function agregarCupon() {
    const boton = document.getElementById("btn-agregar-producto")

    // Evitar doble click
    if (boton.disabled) return
    boton.disabled = true

    let formData = new FormData()

    let cupon = document.getElementById('nombre-cupon')
        .value
        .trim()
        .toUpperCase()
        .replace(/\s/g,'')

    let descuento = document.getElementById('descuento')
        .value
        .trim()

    let texto = document.getElementById('descripcion')
        .value
        .trim()

    // Validaciones
    if (cupon === "") {
        alert("Debe ingresar un nombre de cupón.")
        boton.disabled = false
        return
    }

    if (descuento === "") {
        alert("Debe ingresar un porcentaje de descuento.")
        boton.disabled = false
        return
    }

    // Convertir porcentaje a decimal (ej: 50 → 0.5)
    let descuentoFloat = parseFloat(descuento)

    if (isNaN(descuentoFloat) || descuentoFloat < 0) {
        descuentoFloat = 0
    }

    if (descuentoFloat > 100) {
        descuentoFloat = 100
    }

    // Convertir a formato decimal con 1 decimal
    descuentoFloat = descuentoFloat / 100

    formData.append('cupon', cupon)
    formData.append('descuento', descuentoFloat)
    formData.append('texto', texto)
    formData.append('activo', 1)

    fetch(api + '/cupones', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) return response.json()
        throw new Error()
    })
    .then(data => {

        alert('Cupón agregado correctamente.')

        // Limpiar formulario
        document.getElementById('nombre-cupon').value = ""
        document.getElementById('descuento').value = ""
        document.getElementById('descripcion').value = ""

    })
    .catch(error => {
        alert('Error al agregar el cupón.')
    })
    .finally(() => {
        boton.disabled = false
    })
}


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