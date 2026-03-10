// Chequea si hay sesión admin
function verificarSesionAdmin() {
    let login = localStorage.getItem("adminLogueado")
    if (login !== "true") {
        window.open("iniciar-sesion.html", "_self")
    }
}


// Mostrar nombre admin
function mostrarUsuarioAdmin() {
    let nombre = localStorage.getItem("adminNombre")
    let apellido = localStorage.getItem("adminApellido")

    if (nombre) {
        document.getElementById("admin-nombre").innerText =
            nombre + " " + apellido
    }
}


// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("adminLogueado")
    localStorage.removeItem("adminNombre")
    localStorage.removeItem("adminApellido")
    window.open("iniciar-sesion.html", "_self")
}


// Buscar usuario
function buscarUsuario() {
    let id = document.getElementById("bottbuscar").value.trim()

    if (id === "") {
        alert("Ingrese una ID de usuario.")
        return
    }

    fetch(api + `/usuarios/${id}`)
        .then(res => res.json())
        .then(data => {

            if (data.nombre === undefined) {
                alert("El usuario no existe.")
                document.getElementById("nombre").value = ""
                document.getElementById("apellido").value = ""
                document.getElementById("email").value = ""
                document.getElementById("passw").value = ""
                document.getElementById("administrador").checked = false
                return
            }

            document.getElementById("nombre").value = data.nombre
            document.getElementById("apellido").value = data.apellido
            document.getElementById("email").value = data.email
            document.getElementById("passw").value = data.passw
            document.getElementById("administrador").checked = data.administrador === 1 ? true : false
        })
        .catch(error => {
            alert("Error al buscar usuario.")
            console.log(error)
        })
}


// Actualizar usuario
function actualizarUsuario() {
    const boton = document.getElementById("btn-agregar-producto")

    if (boton.disabled) return
    boton.disabled = true

    let formData = new FormData()

    let id = document.getElementById("bottbuscar").value.trim()
    let nombre = document.getElementById("nombre").value.trim()
    let apellido = document.getElementById("apellido").value.trim()
    let email = document.getElementById("email").value.trim()
    let passw = document.getElementById("passw").value.trim()
    let administrador = document.getElementById("administrador").checked ? 1 : 0

    formData.append("nombre", nombre)
    formData.append("apellido", apellido)
    formData.append("email", email)
    formData.append("passw", passw)
    formData.append("administrador", administrador)

    fetch(api + `/usuarios/${id}`, {
        method: "PUT",
        body: formData
    })
        .then(response => {
            if (response.ok) return response.json()

            throw new Error()
        })
        .then(data => {
            alert("Usuario actualizado correctamente.")
        })
        .catch(error => {
            alert("Error al actualizar usuario.")
        })
        .finally(() => {
            boton.disabled = false
        })
}


// Inicialización
window.addEventListener("load", async function () {
    await apiReady

    verificarSesionAdmin()
    mostrarUsuarioAdmin()

    let idGuardado = localStorage.getItem("actualizarUsuarioSeleccionado")

    if (idGuardado !== null) {

        // convertir a número
        let idUsuario = parseInt(idGuardado)

        // poner la ID en el input
        document.getElementById('bottbuscar').value = idUsuario

        // ejecutar la búsqueda automáticamente
        buscarUsuario()

        // eliminar la variable del localStorage
        localStorage.removeItem("actualizarUsuarioSeleccionado")
    }
})