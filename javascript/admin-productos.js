// API a utilizar:  TRUE = online / FALSE = local
let apiOnline = false
let api = ''
let apiInactivos = ""

if (apiOnline == true) {
    api = 'https://emanuel.pythonanywhere.com/productos'
    apiInactivos = ''
} else {
    api = 'http://127.0.0.1:5000/productos'
    apiInactivos = 'http://127.0.0.1:5000/productos/inactivos'
}


// Carga la lista completa de productos desde DB
function mostrarProductos() {
    fetch(api)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let items = document.getElementsByClassName("items-productos-admin")

            if (longitud === 0) {
                items[0].innerHTML +=
                    `<div class="carro-vacio">
                        <i id="carro-icono" class="fa fa-eye" aria-hidden="true" style="color: #9d4a07;"></i>
                        <br>
                        <div class="nada-div">No hay productos activos</div>
                        <br>
                        <div class="texto-vacio">Añada nuevos productos. <br> Para activar productos existentes, seleccione la opción "Ocultos" <br> y use el botón "Publicar" de cada producto.</div>
                    </div>`
            }

            for (let i = 0; i < longitud; i++) {
                items[0].innerHTML +=
                    `<tr class="item-carro">
                    <td>
                        <img class="imagen-item"
                            src="img/placeholder.jpg"
                            data-src="${data[i].imagen}"
                            draggable="false"
                            onerror="this.src='img/placeholder.jpg'">
                    </td>
                    
                    <td class="titulo-precio-item">
                        <div class="titulo-item">${data[i].nombre}</div>
                        <div class="precio-item"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${data[i].precio.toLocaleString()},00  -  ID de producto: ${data[i].id}</div>
                    </td>

                    <td class="admin-productos-botones">
                        <button class="admin-actualizar-item" onclick="abrirProducto(${data[i].id})"><i class="fa fa-pencil-square-o" style="color: #ffffff;"></i> Actualizar</button>
                        <button class="admin-eliminar-item" onclick="mostrarBotones(${data[i].id})"><i class="fa fa-eye-slash" aria-hidden="true" style="color: #ffffff;"></i> Ocultar</button>

                        <div class="admin-confirmacion">
                            <button class="admin-sumar-item" id="eliminar-si-${data[i].id}" onclick="cambiarEstadoProducto(${data[i].id}, 0)"><i class="fa-solid fa-check" style="color: #ffffff;"></i></i></button>
                            <button class="admin-restar-item" id="eliminar-no-${data[i].id}" onclick="mostrarBotones(${data[i].id})"><i class="fa-solid fa-x" style="color: #ffffff;"></i></i></button>
                        </div>
                    </td>
                </tr>`

                document.getElementById(`eliminar-si-${data[i].id}`).style.display = "none"
                document.getElementById(`eliminar-no-${data[i].id}`).style.display = "none"
            }

            let imgs = document.querySelectorAll(".imagen-item")

            imgs.forEach(img => {
                setTimeout(() => {
                    img.src = img.dataset.src
                }, 50)
            })
        }
    );
}


// Mostrar productos inactivos con la posibilidad de activar
function mostrarProductosInactivos() {
    fetch(apiInactivos)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let longitud = data.length

            let items = document.getElementsByClassName("items-productos-admin")

            if (longitud === 0) {
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
                            data-src="${data[i].imagen}"
                            draggable="false"
                            onerror="this.src='img/placeholder.jpg'">
                    </td>
                    
                    <td class="titulo-precio-item">
                        <div class="titulo-item">${data[i].nombre}</div>
                        <div class="precio-item"><i class="fa-solid fa-money-bill-wave" style="color: #07b032;"></i> $${data[i].precio.toLocaleString()},00  -  ID de producto: ${data[i].id}</div>
                    </td>

                    <td class="admin-productos-botones">
                        <button class="admin-actualizar-item" onclick="abrirProducto(${data[i].id})"><i class="fa fa-pencil-square-o" style="color: #ffffff;"></i> Actualizar</button>
                        <button class="admin-publicar-item" onclick="mostrarBotones(${data[i].id})"><i class="fa fa-eye" aria-hidden="true" style="color: #ffffff;"></i> Publicar</button>

                        <div class="admin-confirmacion">
                            <button class="admin-sumar-item" id="eliminar-si-${data[i].id}" onclick="cambiarEstadoProducto(${data[i].id}, 1)"><i class="fa-solid fa-check" style="color: #ffffff;"></i></i></button>
                            <button class="admin-restar-item" id="eliminar-no-${data[i].id}" onclick="mostrarBotones(${data[i].id})"><i class="fa-solid fa-x" style="color: #ffffff;"></i></i></button>
                        </div>
                    </td>
                </tr>`

                document.getElementById(`eliminar-si-${data[i].id}`).style.display = "none"
                document.getElementById(`eliminar-no-${data[i].id}`).style.display = "none"
            }

            let imgs = document.querySelectorAll(".imagen-item")

            imgs.forEach(img => {
                setTimeout(() => {
                    img.src = img.dataset.src
                }, 50)
            })
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
window.addEventListener('load', function () {
    mostrarProductos()
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

    fetch(api + `/${id}/activo`, {
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


function cambiarVistaProductos(){

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
function tamañoPantalla() {
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

window.addEventListener('resize', tamañoPantalla)