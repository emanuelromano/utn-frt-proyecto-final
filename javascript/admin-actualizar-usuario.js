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

    let id = document.getElementById("bottbuscar").value.trim()

    if (id === "") {
        alert("ID de usuario no válida.")
        return
    }

    let formData = new FormData()

    let nombre = document.getElementById("nombre").value.trim()
    let apellido = document.getElementById("apellido").value.trim()
    let email = document.getElementById("email").value.trim()
    let passw = document.getElementById("passw").value.trim()
    let administrador = document.getElementById("administrador").checked ? 1 : 0

    if (nombre === "" || apellido === "" || email === "" || passw === "") {
        alert("Debe completar todos los campos.")
        boton.disabled = false
        return
    }

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