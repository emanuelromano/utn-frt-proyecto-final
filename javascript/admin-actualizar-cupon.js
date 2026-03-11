// Chequea si hay una sesion de admin activa
function verificarSesionAdmin() {
    let login = localStorage.getItem("usuarioLogueado")

    if (login !== "true") {
        window.open("iniciar-sesion.html", "_self")
    }
}


// Mostrar nombre y apellido de usuario
function mostrarUsuarioAdmin() {
    let nombre = localStorage.getItem("usuarioNombre")
    let apellido = localStorage.getItem("usuarioApellido")
    let admin = localStorage.getItem("usuarioAdministrador")

    if (nombre) {
        if (admin == 1) {
            document.getElementById("admin-label").innerText = "Administrador: "
        } else {
            document.getElementById("admin-label").innerText = "Usuario: "
        }

        document.getElementById("admin-nombre").innerText = nombre + " " + apellido
    }
}


// Cerrar sesion eliminando las variables del localStorage
function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado")
    localStorage.removeItem("usuarioID")
    localStorage.removeItem("usuarioNombre")
    localStorage.removeItem("usuarioApellido")
    localStorage.removeItem("usuarioAdministrador")

    window.open("iniciar-sesion.html","_self")
}


// Actualizar cupón en la base de datos
function actualizarCupon() {
    const boton = document.getElementById("btn-agregar-producto")

    // evitar doble click
    if (boton.disabled) return
    boton.disabled = true

    let formData = new FormData()

    let id = document.getElementById('bottbuscar').value.trim()

    let cupon = document.getElementById('nombre-cupon')
        .value
        .trim()
        .toUpperCase()
        .replace(/\s/g,'')

    let texto = document.getElementById('descripcion')
        .value
        .trim()

    let descuento = document.getElementById('descuento')
        .value
        .trim()

    // validaciones
    if (id === "") {
        alert("Debe ingresar una ID de cupón.")
        boton.disabled = false
        return
    }

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

    // convertir porcentaje a decimal
    let descuentoFloat = parseFloat(descuento)

    if (isNaN(descuentoFloat) || descuentoFloat < 0) {
        descuentoFloat = 0
    }

    if (descuentoFloat > 100) {
        descuentoFloat = 100
    }

    descuentoFloat = descuentoFloat / 100

    formData.append('cupon', cupon)
    formData.append('texto', texto)
    formData.append('descuento', descuentoFloat)
    formData.append('activo', 1)

    fetch(api + `/cupones/${id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (response.ok) return response.json()
        throw new Error()
    })
    .then(data => {

        alert('Cupón actualizado correctamente.')

        document.getElementById('bottbuscar').value = ""
        document.getElementById('nombre-cupon').value = ""
        document.getElementById('descripcion').value = ""
        document.getElementById('descuento').value = ""

    })
    .catch(error => {
        alert('Error al actualizar el cupón.')
    })
    .finally(() => {
        boton.disabled = false
    })
}


// Buscar cupón en la base de datos según la ID
function buscarCupon() {

    let id = document.getElementById('bottbuscar').value.trim()

    if (id === "") {
        alert("Ingrese una ID de cupón.")
        return
    }

    fetch(api + `/cupones/${id}`)
        .then(res => res.json())
        .then(data => {

            console.log(data)

            // Si no existe
            if (data.cupon === undefined) {

                alert("El cupón no existe.")

                document.getElementById('bottbuscar').value = ""
                document.getElementById('nombre-cupon').value = ""
                document.getElementById('descripcion').value = ""
                document.getElementById('descuento').value = ""

                return
            }

            // Cargar datos en el formulario
            document.getElementById('nombre-cupon').value = data.cupon
            document.getElementById('descripcion').value = data.texto

            // Convertir decimal a porcentaje
            document.getElementById('descuento').value = Math.round(data.descuento * 100)

        })
        .catch(error => {

            alert('Error al buscar el cupón.')

            document.getElementById('bottbuscar').value = ""
            document.getElementById('nombre-cupon').value = ""
            document.getElementById('descripcion').value = ""
            document.getElementById('descuento').value = ""
        })
}


// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', async function () {
    //await cargarConfiguracionAPI()
    await apiReady

    verificarSesionAdmin()
    mostrarUsuarioAdmin()

    let idGuardado = localStorage.getItem("actualizarCuponSeleccionado")

    if (idGuardado !== null) {

        // convertir a número
        let idCupon = parseInt(idGuardado)

        // poner la ID en el input
        document.getElementById('bottbuscar').value = idCupon

        // ejecutar la búsqueda automáticamente
        buscarCupon()

        // eliminar la variable del localStorage
        localStorage.removeItem("actualizarCuponSeleccionado")
    }
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