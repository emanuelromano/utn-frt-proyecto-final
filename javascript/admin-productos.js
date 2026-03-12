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


let paginaActual = 1
let productosPorPagina = 12

// Funcion de creacion de paginación
function crearPaginacion(totalProductos) {
    let contenedor = document.getElementById("paginacion")

    if (!contenedor) return

    contenedor.innerHTML = ""

    let totalPaginas = Math.ceil(totalProductos / productosPorPagina)

    // Botón anterior
    if (paginaActual > 1) {
        contenedor.innerHTML += `
        <button onclick="mostrarProductos(${paginaActual - 1})">
        « Anterior
        </button>`
    }

    // Cantidad máxima de botones visibles
    let maxBotones = 5

    let inicio = Math.max(1, paginaActual - 2)
    let fin = Math.min(totalPaginas, inicio + maxBotones - 1)

    for (let i = inicio; i <= fin; i++) {
        contenedor.innerHTML += `
        <button class="${i === paginaActual ? 'pagina-activa' : ''}"
        onclick="mostrarProductos(${i})">
        ${i}
        </button>`
    }

    // Botón siguiente
    if (paginaActual < totalPaginas) {
        contenedor.innerHTML += `
        <button onclick="mostrarProductos(${paginaActual + 1})">
        Siguiente »
        </button>`
    }
}


// Carga la lista completa de productos desde la DB
function mostrarProductos(pagina = 1) {
    paginaActual = pagina

    // Guardar página actual
    localStorage.setItem("pagina_productos", paginaActual)

    fetch(api + '/productos?pagina=' + paginaActual + '&limite=' + productosPorPagina)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let productos = data.productos
            let total = data.total
            let longitud = productos.length

            let items = document.getElementsByClassName("items-productos-admin")[0]

            items.innerHTML = ""

            if (longitud === 0) {
                items.innerHTML +=
                    `<div class="carro-vacio">
                        <i id="carro-icono" class="fa fa-eye" aria-hidden="true" style="color: #9d4a07;"></i>
                        <br>
                        <div class="nada-div">No hay productos activos</div>
                        <br>
                        <div class="texto-vacio">Añada nuevos productos. <br> Para activar productos existentes, seleccione la opción "Ocultos" <br> y use el botón "Publicar" de cada producto.</div>
                    </div>`
            } else {
                document.getElementById(`paginacion`).style.display = "flex"
            }

            for (let i = 0; i < longitud; i++) {
                items.innerHTML +=
                    `<tr class="item-carro">
                        <td>
                            <img class="imagen-item"
                                src="img/placeholder.jpg"
                                data-src="${productos[i].imagen}"
                                draggable="false"
                                onerror="this.src='img/placeholder.jpg'">
                        </td>
                        
                        <td class="titulo-precio-item">
                            <div class="titulo-item">${productos[i].nombre}</div>
                            <div class="precio-item"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${productos[i].precio.toLocaleString()},00  -  ID de producto: ${productos[i].id}</div>
                        </td>

                        <td class="admin-productos-botones">
                            <button class="admin-actualizar-item" onclick="abrirProducto(${productos[i].id})"><i class="fa fa-pencil-square-o" style="color: #ffffff;"></i> Actualizar</button>
                            <button class="admin-eliminar-item" onclick="mostrarBotones(${productos[i].id})"><i class="fa fa-eye-slash" aria-hidden="true" style="color: #ffffff;"></i> Ocultar</button>

                            <div class="admin-confirmacion">
                                <button class="admin-sumar-item" id="eliminar-si-${productos[i].id}" onclick="cambiarEstadoProducto(${productos[i].id}, 0)"><i class="fa-solid fa-check" style="color: #ffffff;"></i></i></button>
                                <button class="admin-restar-item" id="eliminar-no-${productos[i].id}" onclick="mostrarBotones(${productos[i].id})"><i class="fa-solid fa-x" style="color: #ffffff;"></i></i></button>
                            </div>
                        </td>
                    </tr>`

                document.getElementById(`eliminar-si-${productos[i].id}`).style.display = "none"
                document.getElementById(`eliminar-no-${productos[i].id}`).style.display = "none"
            }

            // Lazy load de imágenes
            let imgs = document.querySelectorAll(".imagen-item")

            imgs.forEach(img => {
                setTimeout(() => {
                    img.src = img.dataset.src
                }, 50)
            })

            crearPaginacion(total)
        }
    );
}


// Mostrar productos inactivos con la posibilidad de activar
function mostrarProductosInactivos(pagina = 1) {
       paginaActual = pagina

    // Guardar página actual
    localStorage.setItem("pagina_productos", paginaActual)

    fetch(api + '/productos/inactivos?pagina=' + paginaActual + '&limite=' + productosPorPagina)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let productos = data.productos
            let total = data.total
            let longitud = productos.length

            let items = document.getElementsByClassName("items-productos-admin")

            if (longitud === 0) {
                document.getElementById(`paginacion`).style.display = "none"

                items[0].innerHTML +=
                    `<div class="carro-vacio">
                        <i id="carro-icono" class="fa fa-eye-slash" aria-hidden="true" style="color: #9d4a07;"></i>
                        <br>
                        <div class="nada-div">No hay productos ocultos</div>
                        <br>
                        <div class="texto-vacio">Añada nuevos productos. <br> Para ocultar productos de la tienda, seleccione la opción "Publicados" <br> y use el botón "Ocultar" de cada producto.</div>
                    </div>`
            }

            for (let i = 0; i < longitud; i++) {
                items[0].innerHTML +=
                    `<tr class="item-carro">
                        <td>
                            <img class="imagen-item"
                                src="img/placeholder.jpg"
                                data-src="${productos[i].imagen}"
                                draggable="false"
                                onerror="this.src='img/placeholder.jpg'">
                        </td>
                        
                        <td class="titulo-precio-item">
                            <div class="titulo-item">${productos[i].nombre}</div>
                            <div class="precio-item"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${productos[i].precio.toLocaleString()},00  -  ID de producto: ${productos[i].id}</div>
                        </td>

                        <td class="admin-productos-botones">
                            <button class="admin-actualizar-item" onclick="abrirProducto(${productos[i].id})"><i class="fa fa-pencil-square-o" style="color: #ffffff;"></i> Actualizar</button>
                            <button class="admin-publicar-item" onclick="mostrarBotones(${productos[i].id})"><i class="fa fa-eye" aria-hidden="true" style="color: #ffffff;"></i> Publicar</button>

                            <div class="admin-confirmacion">
                                <button class="admin-sumar-item" id="eliminar-si-${productos[i].id}" onclick="cambiarEstadoProducto(${productos[i].id}, 1)"><i class="fa-solid fa-check" style="color: #ffffff;"></i></i></button>
                                <button class="admin-restar-item" id="eliminar-no-${productos[i].id}" onclick="mostrarBotones(${productos[i].id})"><i class="fa-solid fa-x" style="color: #ffffff;"></i></i></button>
                            </div>
                        </td>
                    </tr>`

                document.getElementById(`eliminar-si-${productos[i].id}`).style.display = "none"
                document.getElementById(`eliminar-no-${productos[i].id}`).style.display = "none"
            }

            // Lazy load de imágenes
            let imgs = document.querySelectorAll(".imagen-item")

            imgs.forEach(img => {
                setTimeout(() => {
                    img.src = img.dataset.src
                }, 50)
            })

            crearPaginacion(total)
        }
    );
}


// Abre la vista de un producto seleccionado
function abrirProducto(id) {
    localStorage.setItem("actualizarProductoSeleccionado", id)
    window.open('admin-actualizar-producto.html', '_self')
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
    mostrarProductos(1)
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


// Eliminar producto
/*function eliminarProducto(id) {
    fetch(api + `/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Producto eliminado correctamente.')

                let tabla = document.getElementsByClassName('items-productos-admin')
                tabla[0].innerHTML = ""

                mostrarProductos()
            }
        })
        .catch(error => {
            alert(error.message);
        });
}*/


// Activar o desactivar producto
function cambiarEstadoProducto(id, estado) {

    let formData = new FormData()
    formData.append("activo", estado)

    fetch(api + `/productos/${id}/activo`, {
        method: 'PUT',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Estado de producto modificado correctamente.')
            mostrarBotones(id)

            let tabla = document.getElementsByClassName('items-productos-admin')
            tabla[0].innerHTML = ""
            
            if (estado === 0)
                mostrarProductos()
            else
                mostrarProductosInactivos()
        }
    })
    .catch(error => {
        alert(error.message);
    });

}


// Mostrar productos activos (publicados) o inactivos (ocultos) en la tienda
function cambiarVistaProductos() {
    let opcion = document.querySelector('input[name="estadoProductos"]:checked').value

    let tabla = document.getElementsByClassName('items-productos-admin')
    tabla[0].innerHTML = ""

    if(opcion === "activos"){
        mostrarProductos()
    }
    else{
        mostrarProductosInactivos()
    }
}


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