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


// Carga la lista completa de cupones desde DB
function mostrarCupones() {
    fetch(api + '/cupones')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let items = document.getElementsByClassName("items-cupones-admin")

            if (longitud === 0) {
                items[0].innerHTML +=
                    `<div class="carro-vacio">
                        <i id="carro-icono" class="fa fa-ticket" aria-hidden="true" style="color: #9d4a07;"></i>
                        <br>
                        <div class="nada-div">No hay cupones activos</div>
                        <br>
                        <div class="texto-vacio">Añada nuevos cupones. <br> Para activar cupones existentes, seleccione la opción "Inactivos" <br> y use el botón "Activar" de cada cupón.</div>
                    </div>`
            }

            for (let i = 0; i < longitud; i++) {
                items[0].innerHTML +=
                    `<tr class="item-carro">
                        <td>
                            <img class="imagen-item"
                                src="img/cupon-placeholder.jpg"
                                draggable="false"
                                onerror="this.src='img/cupon-placeholder.jpg'">
                        </td>
                        
                        <td class="titulo-precio-item">
                            <div class="titulo-item">${data[i].cupon}</div>
                            <div class="precio-item" style="color: #bc863b; font-size:15px; margin-bottom: 6px;">${data[i].texto}</div>
                            <div class="precio-item"><i class="fa fa-ticket" aria-hidden="true" style="color: #ff2f00;"></i> Descuento: ${(data[i].descuento * 100).toFixed(0)}%  -  ID de cupón: ${data[i].id}</div>
                        </td>

                        <td class="admin-productos-botones">
                            <button class="admin-actualizar-item" onclick="abrirCupon(${data[i].id})"><i class="fa fa-pencil-square-o" style="color: #ffffff;"></i> Actualizar</button>
                            <button class="admin-eliminar-item" onclick="mostrarBotones(${data[i].id})"><i class="fa fa-times" aria-hidden="true" style="color: #ffffff;"></i> Desactivar</button>

                            <div class="admin-confirmacion">
                                <button class="admin-sumar-item" id="eliminar-si-${data[i].id}" onclick="cambiarEstadoCupon(${data[i].id}, 0)"><i class="fa-solid fa-check" style="color: #ffffff;"></i></i></button>
                                <button class="admin-restar-item" id="eliminar-no-${data[i].id}" onclick="mostrarBotones(${data[i].id})"><i class="fa-solid fa-x" style="color: #ffffff;"></i></i></button>
                            </div>
                        </td>
                    </tr>`

                document.getElementById(`eliminar-si-${data[i].id}`).style.display = "none"
                document.getElementById(`eliminar-no-${data[i].id}`).style.display = "none"
            }
        }
        );
}


// Mostrar cupones inactivos con la posibilidad de activar
function mostrarCuponesInactivos() {
    fetch(api + '/cupones/inactivos')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let items = document.getElementsByClassName("items-cupones-admin")

            if (longitud === 0) {
                items[0].innerHTML +=
                    `<div class="carro-vacio">
                        <i id="carro-icono" class="fa fa-window-close-o" aria-hidden="true" style="color: #9d4a07;"></i>
                        <br>
                        <div class="nada-div">No hay cupones inactivos</div>
                        <br>
                        <div class="texto-vacio">Añada nuevos cupones. <br> Para desactivar cupones de la tienda, seleccione la opción "Activos" <br> y use el botón "Desactivar" de cada cupón.</div>
                    </div>`
            }

            for (let i = 0; i < longitud; i++) {
                items[0].innerHTML +=
                    `<tr class="item-carro">
                        <td>
                            <img class="imagen-item"
                                src="img/cupon-placeholder.jpg"
                                draggable="false"
                                onerror="this.src='img/cupon-placeholder.jpg'">
                        </td>
                        
                        <td class="titulo-precio-item">
                            <div class="titulo-item">${data[i].cupon}</div>
                            <div class="precio-item" style="color: #bc863b; font-size:15px; margin-bottom: 6px;">${data[i].texto}</div>
                            <div class="precio-item"><i class="fa fa-ticket" aria-hidden="true" style="color: #ff2f00;"></i> Descuento: ${(data[i].descuento * 100).toFixed(0)}%  -  ID de cupón: ${data[i].id}</div>
                        </td>

                        <td class="admin-productos-botones">
                            <button class="admin-actualizar-item" onclick="abrirCupon(${data[i].id})"><i class="fa fa-pencil-square-o" style="color: #ffffff;"></i> Actualizar</button>
                            <button class="admin-publicar-item" onclick="mostrarBotones(${data[i].id})"><i class="fa fa-check-circle-o" aria-hidden="true" style="color: #ffffff;"></i> Activar</button>

                            <div class="admin-confirmacion">
                                <button class="admin-sumar-item" id="eliminar-si-${data[i].id}" onclick="cambiarEstadoCupon(${data[i].id}, 1)"><i class="fa-solid fa-check" style="color: #ffffff;"></i></i></button>
                                <button class="admin-restar-item" id="eliminar-no-${data[i].id}" onclick="mostrarBotones(${data[i].id})"><i class="fa-solid fa-x" style="color: #ffffff;"></i></i></button>
                            </div>
                        </td>
                    </tr>`

                document.getElementById(`eliminar-si-${data[i].id}`).style.display = "none"
                document.getElementById(`eliminar-no-${data[i].id}`).style.display = "none"
            }
        }
    );
}


// Abre la vista de un producto seleccionado
function abrirCupon(id) {
    localStorage.setItem("actualizarCuponSeleccionado", id)
    window.open('admin-actualizar-cupon.html', '_self')
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

    verificarSesionAdmin()
    mostrarUsuarioAdmin()
    mostrarCupones()
})


// Mostrar u ocultar botones
let botones = false

function mostrarBotones(id) {
    if (botones == false) {
        document.getElementById(`eliminar-si-${id}`).style.display = "inline"
        document.getElementById(`eliminar-no-${id}`).style.display = "inline"

        botones = true
    } else if (botones == true) {
        document.getElementById(`eliminar-si-${id}`).style.display = "none"
        document.getElementById(`eliminar-no-${id}`).style.display = "none"

        botones = false
    }
}


// Mostrar cupones activos (publicados) o inactivos (ocultos) en la tienda
function cambiarVistaCupones() {
    let opcion = document.querySelector('input[name="estadoCupones"]:checked').value

    let tabla = document.getElementsByClassName('items-cupones-admin')
    tabla[0].innerHTML = ""

    if (opcion === "activos") {
        mostrarCupones()
    }
    else {
        mostrarCuponesInactivos()
    }
}


// Activar o desactivar producto
function cambiarEstadoCupon(id, estado) {

    let formData = new FormData()
    formData.append("activo", estado)

    fetch(api + `/cupones/${id}/activo`, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                alert('Estado de cupón modificado correctamente.')
                mostrarBotones(id)

                let tabla = document.getElementsByClassName('items-cupones-admin')
                tabla[0].innerHTML = ""

                if (estado === 0)
                    mostrarCupones()
                else
                    mostrarCuponesInactivos()
            }
        })
        .catch(error => {
            alert(error.message);
        });
}

