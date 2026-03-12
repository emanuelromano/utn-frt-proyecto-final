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


function cargarDashboard() {
    fetch(api + "/admin/dashboard")
        .then(res => res.json())
        .then(data => {
            document.getElementById("dash-productos").innerText = data.productos_totales
            document.getElementById("dash-activos").innerText = data.productos_activos
            document.getElementById("dash-inactivos").innerText = data.productos_inactivos
            document.getElementById("dash-cupones").innerText = data.cupones_totales
            document.getElementById("dash-usuarios").innerText = data.usuarios_totales
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


// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', async function () {
    //await cargarConfiguracionAPI()
    await apiReady

    if (localStorage.getItem("estado")) localStorage.removeItem("pagina_productos")
    if (localStorage.getItem("pagina_productos")) localStorage.removeItem("pagina_productos")

    verificarSesionAdmin()
    mostrarUsuarioAdmin()
    cargarDashboard()
})


// Ocultar elementos del Nav Bar en modo para moviles con Event Listener
/*function tamañoPantalla() {
    let tamaño = document.documentElement.clientWidth

    if (tamaño > 800) {
        document.getElementById("menu-item-1").style.display = "flex"
        document.getElementById("menu-item-2").style.display = "flex"
        document.getElementById("menu-item-3").style.display = "flex"
        //document.getElementById("menu-item-4").style.display = "flex"
    } else if (tamaño <= 800) {
        document.getElementById("menu-item-1").style.display = "none"
        document.getElementById("menu-item-2").style.display = "none"
        document.getElementById("menu-item-3").style.display = "none"
        //document.getElementById("menu-item-4").style.display = "none"
    }
}

window.addEventListener('resize', tamañoPantalla)*/


// DEBUG - Reinicia contador de carro, carro de compras, compra final e info de compras
function debug() {
    localStorage.setItem("contadorCarrito", 0)
    localStorage.setItem("carroDeCompras", JSON.stringify([]))
    localStorage.removeItem("compra")
    localStorage.removeItem("infoCompra")
    let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
    botonCarrito[0].innerText = `Carro (0)`
}