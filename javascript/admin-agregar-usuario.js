// Chequea si hay una sesion de admin activa
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


// Cerrar sesion
function cerrarSesion() {

    localStorage.removeItem("adminLogueado")
    localStorage.removeItem("adminNombre")
    localStorage.removeItem("adminApellido")

    window.open("iniciar-sesion.html", "_self")

}


// Agregar usuario
function agregarUsuario() {

    const boton = document.getElementById("btn-agregar-usuario")

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

    verificarSesionAdmin()

    mostrarUsuarioAdmin()

})