function mostrarPrevisualizacion() {

    var urlInput = document.getElementById('urlImagen');
    var url = urlInput.value.trim();
    var preview = document.getElementById('previsualizacion');

    if (url !== "") {

        preview.innerHTML =
        `<img src="${url}"
        alt="Previsualización"
        onerror="this.src='img/placeholder.jpg'"
        draggable="false">`

    } else {
        alert('Por favor, ingrese una URL de imagen válida.');
    }
}