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

            if (longitud === 0) {
                items[0].innerHTML +=
                    `<div class="carro-vacio">
                        <i id="carro-icono" class="fa fa-user" style="color: #9d4a07;"></i>
                        <br>
                        <div class="nada-div">No hay usuarios activos</div>
                        <br>
                        <div class="texto-vacio">Añada nuevos usuarios. <br> Para activar usuarios existentes, seleccione la opción "Inactivos" <br> y use el botón "Activar" de cada usuario.</div>
                    </div>`
            }

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
                            <div class="titulo-item">${data[i].nombre} ${data[i].apellido} ${data[i].administrador === 1 ? "(Admin.)" : ""}</div>

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


// Mostrar usuarios inactivos con la posibilidad de activar
function mostrarUsuariosInactivos() {
    fetch(api + '/usuarios/inactivos')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let items = document.getElementsByClassName("items-usuarios-admin")

            if (longitud === 0) {
                items[0].innerHTML +=
                    `<div class="carro-vacio">
                        <i id="carro-icono" class="fa fa-user" style="color: #9d4a07;"></i>
                        <br>
                        <div class="nada-div">No hay usuarios inactivos</div>
                        <br>
                        <div class="texto-vacio">Añada nuevos usuarios. <br> Para desactivar usuarios existentes, seleccione la opción "Activos" <br> y use el botón "Desactivar" de cada usuario.</div>
                    </div>`
            }

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
                            <div class="titulo-item">${data[i].nombre} ${data[i].apellido} ${data[i].administrador === 1 ? "(Admin.)" : ""}</div>

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


                            <button class="admin-publicar-item"
                                onclick="mostrarBotones(${data[i].id})">

                                <i class="fa fa-check-circle-o" aria-hidden="true"></i> Activar
                            </button>

                            <div class="admin-confirmacion">
                                <button class="admin-sumar-item"
                                    id="eliminar-si-${data[i].id}"
                                    onclick="cambiarEstadoUsuario(${data[i].id},1)">

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
        }
        );
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


// Mostrar usuarios activos (publicados) o inactivos (ocultos)
function cambiarVistaUsuarios() {
    let opcion = document.querySelector('input[name="estadoUsuarios"]:checked').value

    let tabla = document.getElementsByClassName('items-usuarios-admin')
    tabla[0].innerHTML = ""

    if (opcion === "activos") {
        mostrarUsuarios()
    } else {
        mostrarUsuariosInactivos()
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
                alert('Estado de usuario modificado correctamente.')
                mostrarBotones(id)

                let tabla = document.getElementsByClassName('items-usuarios-admin')
                tabla[0].innerHTML = ""

                if (estado === 0)
                    mostrarUsuarios()
                else
                    mostrarUsuariosInactivos()
            }
        })
        .catch(error => {
            alert(error.message);
        });
}


// Funciones al cargar
window.addEventListener('load', async function () {
    await apiReady

    verificarSesionAdmin()
    mostrarUsuarioAdmin()
    mostrarUsuarios()
})