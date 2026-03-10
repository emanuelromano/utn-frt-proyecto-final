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


// Cargar usuarios activos
function mostrarUsuarios() {
    fetch(api + '/usuarios')

        .then(res => res.json())

        .then(data => {

            let items = document.getElementsByClassName("items-usuarios-admin")

            let longitud = data.length

            for (let i = 0; i < longitud; i++) {

                items[0].innerHTML +=
                    `<tr class="item-carro">
                        <td>
                            <img class="imagen-item"
                                src="img/usuario-placeholder.jpg"
                                draggable="false"
                                onerror="this.src='img/usuario-placeholder.jpg'">
                        </td>

                        <td class="titulo-precio-item">
                            <div class="titulo-item">${data[i].nombre} ${data[i].apellido}</div>

                            <div class="precio-item">${data[i].email}</div>

                            <div class="precio-item">
                                <i class="fa fa-user" style="color:#9d4a07;"></i>
                                ID de usuario: ${data[i].id}
                            </div>
                        </td>

                        <td class="admin-productos-botones">
                            <button class="admin-actualizar-item"
                                onclick="abrirUsuario(${data[i].id})">
                                <i class="fa fa-pencil-square-o"></i> Actualizar
                            </button>


                            <button class="admin-eliminar-item"
                                onclick="mostrarBotones(${data[i].id})">

                                <i class="fa fa-times"></i> Desactivar
                            </button>

                            <div class="admin-confirmacion">
                                <button class="admin-sumar-item"
                                    id="eliminar-si-${data[i].id}"
                                    onclick="cambiarEstadoUsuario(${data[i].id},0)">

                                    <i class="fa-solid fa-check"></i>

                                </button>

                                <button class="admin-restar-item"
                                    id="eliminar-no-${data[i].id}"
                                    onclick="mostrarBotones(${data[i].id})">

                                    <i class="fa-solid fa-x"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`

                document.getElementById(`eliminar-si-${data[i].id}`).style.display = "none"
                document.getElementById(`eliminar-no-${data[i].id}`).style.display = "none"
            }
        })
}


// Abrir pantalla de actualizar usuario
function abrirUsuario(id) {
    localStorage.setItem("actualizarUsuarioSeleccionado", id)

    window.open('admin-actualizar-usuario.html', '_self')
}


// Mostrar confirmación
let botones = false

function mostrarBotones(id) {
    if (botones == false) {

        document.getElementById(`eliminar-si-${id}`).style.display = "inline"
        document.getElementById(`eliminar-no-${id}`).style.display = "inline"

        botones = true
    } else {
        document.getElementById(`eliminar-si-${id}`).style.display = "none"
        document.getElementById(`eliminar-no-${id}`).style.display = "none"

        botones = false
    }
}


// Activar o desactivar usuario
function cambiarEstadoUsuario(id, estado) {
    let formData = new FormData()

    formData.append("activo", estado)

    fetch(api + `/usuarios/${id}/activo`, {
        method: 'PUT',
        body: formData
    })
        .then(response => {
            if (response.ok) {

                alert("Estado del usuario modificado correctamente.")

                location.reload()
            }
        })
}


// Funciones al cargar
window.addEventListener('load', async function () {
    await apiReady

    verificarSesionAdmin()
    mostrarUsuarioAdmin()
    mostrarUsuarios()
})