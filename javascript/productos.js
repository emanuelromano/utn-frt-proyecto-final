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

            let contenedor = document.getElementsByClassName("tarjetas-productos")[0]

            contenedor.innerHTML = ""

            for (let i = 0; i < productos.length; i++) {

                contenedor.innerHTML +=
                    `<div class="tarjeta-producto" onclick="abrirProducto(${productos[i].id})">

                        <img class="imagen-tarjeta"
                            src="img/placeholder.jpg"
                            data-src="${productos[i].imagen}"
                            draggable="false"
                            onerror="this.src='img/placeholder.jpg'">

                        <h3 class="titulo-tarjeta">${productos[i].nombre}</h3>

                        <h4 class="precio-tarjeta">
                        <i class="fa-solid fa-money-bill-wave" style="color:#07b032;"></i>
                        $${productos[i].precio},00
                        </h4>

                    </div>`
            }

            // Lazy load de imágenes
            let imgs = document.querySelectorAll(".imagen-tarjeta")

            imgs.forEach(img => {
                setTimeout(() => {

                    if (img.dataset.src && img.dataset.src !== "null") {
                        img.src = img.dataset.src
                    }

                }, 50)
            })

            crearPaginacion(total)
        })
}


// Inicializar contador de carro de compras o recuperar número de productos en el carro
function cargarContadorCarrito() {
    if (localStorage.getItem("contadorCarrito") === null) {
        localStorage.setItem("contadorCarrito", 0)
    } else {
        let contadorCarrito = parseInt(localStorage.getItem("contadorCarrito"))
        let botonCarrito = document.getElementsByClassName("boton-carrito-contador")
        botonCarrito[0].innerText = `Carro (${contadorCarrito})`
    }
}


// Abre la vista de un producto seleccionado
function abrirProducto(id) {
    localStorage.setItem("productoSeleccionado", id)
    window.open('producto.html', '_self')
}


// Ocultar elementos del Nav Bar en modo para moviles
function menuHamburguesa() {
    let menuItemDisplay = window.getComputedStyle(document.querySelector('#menu-item-1')).display

    if (menuItemDisplay === "flex") {
        document.getElementById("menu-item-1").style.display = "none"
        document.getElementById("menu-item-2").style.display = "none"
        document.getElementById("menu-item-3").style.display = "none"
        document.getElementById("menu-item-4").style.display = "none"
    } else if (menuItemDisplay === "none") {
        document.getElementById("menu-item-1").style.display = "flex"
        document.getElementById("menu-item-2").style.display = "flex"
        document.getElementById("menu-item-3").style.display = "flex"
        document.getElementById("menu-item-4").style.display = "flex"
    }
}


// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', async function () {
    //await cargarConfiguracionAPI()
    await apiReady

    let paginaGuardada = localStorage.getItem("pagina_productos")

    if (paginaGuardada) {
        mostrarProductos(parseInt(paginaGuardada))
    } else {
        mostrarProductos(1)
    }

    cargarContadorCarrito()
})


// Ocultar elementos del Nav Bar en modo para moviles con Event Listener
/*function tamañoPantalla() {
    let tamaño = document.documentElement.clientWidth

    if (tamaño > 800) {
        document.getElementById("menu-item-1").style.display = "flex"
        document.getElementById("menu-item-2").style.display = "flex"
        document.getElementById("menu-item-3").style.display = "flex"
        document.getElementById("menu-item-4").style.display = "flex"
    } else if (tamaño <= 800) {
        document.getElementById("menu-item-1").style.display = "none"
        document.getElementById("menu-item-2").style.display = "none"
        document.getElementById("menu-item-3").style.display = "none"
        document.getElementById("menu-item-4").style.display = "none"
    }
}

window.addEventListener('resize', tamañoPantalla)*/