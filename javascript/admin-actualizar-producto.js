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


// Actualizar productos en la base de datos
function actualizarProducto() {
    var formData = new FormData();

    url = document.getElementById('nombre').value.trim().toLowerCase().replace(/ /g, "-")

    formData.append('id', document.getElementById('bottbuscar').value.trim())
    formData.append('nombre', document.getElementById('nombre').value.trim())
    formData.append('url', url)
    formData.append('imagen', document.getElementById('urlImagen').value.trim())
    formData.append('descripcion', document.getElementById('descripcion').value.trim())
    formData.append('porciones', document.getElementById('porciones').value.trim())
    formData.append('precio', document.getElementById('precio').value.trim())
    formData.append('activo', 1)

    let id = document.getElementById('bottbuscar').value.trim()

    fetch(api + `/productos/${id}`, {
        method: 'PUT',
        body: formData // Aquí enviamos formData en lugar de JSON
    })
        .then(function (response) {
            if (response.ok) { return response.json(); }
        })
        .then(function (data) {
            alert('Producto actualizado correctamente.');
            // Limpiar el formulario para el proximo producto
            document.getElementById('bottbuscar').value = "";
            document.getElementById('nombre').value = "";
            document.getElementById('urlImagen').value = "";
            document.getElementById('descripcion').value = "";
            document.getElementById('porciones').value = "";
            document.getElementById('precio').value = "";

            var preview = document.getElementById('previsualizacion');
            preview.innerHTML = `<img src="img/placeholder.jpg" alt="Previsualización" draggable="false">`;
        })
        .catch(function (error) {
            // Mostramos el error, y no limpiamos el form.
            alert('Error al actualizar el producto.');
        });
}


// Buscar producto en la base de datos según la ID
function buscarProducto() {
    if (document.getElementById('bottbuscar').value == "") {
        alert("Ingrese una ID de producto.")
    } else {
        let id = document.getElementById('bottbuscar').value.trim()

        fetch(api + `/productos/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data) // para debug

                if (data.nombre == undefined) {
                    alert("El producto no existe.")
                    document.getElementById('bottbuscar').value = ""

                    document.getElementById('bottbuscar').value = "";
                    document.getElementById('nombre').value = "";
                    document.getElementById('urlImagen').value = "";
                    document.getElementById('descripcion').value = "";
                    document.getElementById('porciones').value = "";
                    document.getElementById('precio').value = "";

                    var preview = document.getElementById('previsualizacion');
                    preview.innerHTML = `<img src="img/placeholder.jpg" alt="Previsualización" draggable="false">`;
                    return
                }

                document.getElementById('nombre').value = data.nombre;
                document.getElementById('urlImagen').value = data.imagen;
                document.getElementById('descripcion').value = data.descripcion;
                document.getElementById('porciones').value = data.porciones;
                document.getElementById('precio').value = data.precio;

                var preview = document.getElementById('previsualizacion');
                preview.innerHTML = `<img src="${data.imagen}"
                                    alt="Previsualización"
                                    onerror="this.src='img/placeholder.jpg'"
                                    draggable="false">`;
            }).catch(function (error) {
                // Mostramos el error y limpiamos el form.
                alert('Error al buscar el producto.');

                document.getElementById('bottbuscar').value = "";
                document.getElementById('nombre').value = "";
                document.getElementById('urlImagen').value = "";
                document.getElementById('descripcion').value = "";
                document.getElementById('porciones').value = "";
                document.getElementById('precio').value = "";

                var preview = document.getElementById('previsualizacion');
                preview.innerHTML = `<img src="img/placeholder.jpg" alt="Previsualización" draggable="false">`;
            }
        );
    }
}


// Funciones a ejecutarse al cargar completamente la página
window.addEventListener('load', async function () {
    //await cargarConfiguracionAPI()
    await apiReady

    verificarSesionAdmin()
    mostrarUsuarioAdmin()

    let idGuardado = localStorage.getItem("actualizarProductoSeleccionado")

    if (idGuardado !== null) {

        // convertir a número
        let idProducto = parseInt(idGuardado)

        // poner la ID en el input
        document.getElementById('bottbuscar').value = idProducto

        // ejecutar la búsqueda automáticamente
        buscarProducto()

        // eliminar la variable del localStorage
        localStorage.removeItem("actualizarProductoSeleccionado")
    }
})


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