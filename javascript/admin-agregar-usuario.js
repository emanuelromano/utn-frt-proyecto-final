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
    localStorage.removeItem("estado")
    localStorage.removeItem("pagina_productos")

    window.open("iniciar-sesion.html","_self")
}


// Agregar usuario
function agregarUsuario() {
    const boton = document.getElementById("btn-agregar-producto")

    if (boton.disabled) return
    boton.disabled = true

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
    formData.append("activo", 1)

    fetch(api + "/usuarios", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (response.ok) return response.json()
            throw new Error()
        })
        .then(data => {
            alert("Usuario agregado correctamente.")
            document.getElementById("nombre").value = ""
            document.getElementById("apellido").value = ""
            document.getElementById("email").value = ""
            document.getElementById("passw").value = ""
            document.getElementById("administrador").checked = false
        })
        .catch(error => {
            alert("Error al agregar usuario.")
        })
        .finally(() => {
            boton.disabled = false
        })
}


// Inicialización
window.addEventListener("load", async function () {
    await apiReady

    if (localStorage.getItem("estado")) localStorage.removeItem("pagina_productos")
    if (localStorage.getItem("pagina_productos")) localStorage.removeItem("pagina_productos")

    verificarSesionAdmin()
    mostrarUsuarioAdmin()
})