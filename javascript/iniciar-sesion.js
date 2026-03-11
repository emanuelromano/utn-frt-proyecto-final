// Chequear validez usuario y contraseña
function iniciarSesion() {
    let usuario = document.getElementsByClassName("usuario")[0].value.trim()
    let pass = document.getElementsByClassName("pass")[0].value.trim()

    if (usuario == "" || pass == "") {
        let alerta = document.getElementsByClassName("alerta-inicio-sesion")
        alerta[0].innerHTML = `<div class="alerta-compra-info">
            <i class="fa-solid fa-circle-info" style="color: #000000;"></i> Debe ingresar un usuario y contraseña válidos.
            </div> <br>`
    } else {
        let formData = new FormData()

        formData.append("email", usuario)
        formData.append("passw", pass)

        fetch(api + "/usuario/login", {
            method: "POST",
            body: formData
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                console.log(data)

                if (data.acceso == 1) {
                    // Se guarda variable en localStorage para indicar que una sesión de usuario correcta se ha iniciado, junto con nombre, apellido y flag de administrador
                    localStorage.setItem("usuarioLogueado", "true")
                    localStorage.setItem("usuarioID", data.id)
                    localStorage.setItem("usuarioNombre", data.nombre)
                    localStorage.setItem("usuarioApellido", data.apellido)
                    localStorage.setItem("usuarioAdministrador", data.administrador)

                    window.open('admin-inicio.html', '_self')
                }
                else {
                    let alerta = document.getElementsByClassName("alerta-inicio-sesion")
                    alerta[0].innerHTML = `<div class="alerta-compra-info">
                        <i class="fa-solid fa-circle-info"></i> Usuario o contraseña incorrectos.
                        </div> <br>`
                }
            })
    }
}


// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', async function () {
    //await cargarConfiguracionAPI()
    await apiReady
})