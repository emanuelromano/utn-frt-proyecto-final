// Enviar código de recuperación
function enviarCodigo() {
    let email = document.getElementById("recuperar-email").value.trim()

    if (email === "") {
        alert("Debe ingresar un email.")
        return
    }

    let formData = new FormData()

    formData.append("email", email)

    fetch(api + "/usuarios/recuperar", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje)

            if (data.mensaje == "Email no encontrado") return

            document.querySelector("#recuperar-email").disabled = true
            document.querySelector(".recuperar-btn").disabled = true

            document.querySelector(".recuperar-reset").style.display = "flex"
            document.querySelector(".recuperar-separador").style.display = "flex"
        })
        .catch(error => {
            alert("Error al enviar el código.")
        })
}


// Restablecer contraseña
function restablecerPassword() {
    let email = document.getElementById("recuperar-email").value.trim()
    let codigo = document.getElementById("codigo").value.trim()
    let password = document.getElementById("password").value.trim()

    if (email === "" || codigo === "" || password === "") {
        alert("Debe completar todos los campos.")

        return
    }

    let formData = new FormData()

    formData.append("email", email)
    formData.append("codigo", codigo)
    formData.append("password", password)

    fetch(api + "/usuarios/reset", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje)

            if (data.mensaje === "Password actualizada") {
                window.location.href = "iniciar-sesion.html"
            }
        })

        .catch(error => {
            alert("Error al restablecer contraseña.")
        })
}