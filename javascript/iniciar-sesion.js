// API a utilizar:  TRUE = online / FALSE = local
let apiOnline = false
let api = ''

if (apiOnline == true) {
    api = 'https://emanuel.pythonanywhere.com/usuario'
} else {
    api = "http://127.0.0.1:5000/usuario"
}


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

        fetch(api + "/login", {
            method: "POST",
            body: formData
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {

                console.log(data)

                if (data.acceso == 1) {
                    // Se guarda variable en localStorage para indicar que una sesión de admin correcta se ha iniciado, junto con nombre y apellido
                    localStorage.setItem("adminLogueado", "true")
                    localStorage.setItem("adminNombre", data.nombre)
                    localStorage.setItem("adminApellido", data.apellido)

                    window.open('admin-productos.html', '_self')
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
window.addEventListener('load', function () {

})