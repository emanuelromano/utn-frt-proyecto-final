let api = ''

/*async function cargarConfiguracionAPI() {
    try {
        const response = await fetch('./json/api.json')
        const data = await response.json()

        const config = data[0]

        if (config.conexionRemota === true) {
            api = config.apiOnline
        } else {
            api = config.apiLocal
        }
    } catch (error) {
        console.error("Error cargando api.json:", error)
    }
}*/


async function cargarConfiguracionAPI() {
    const response = await fetch('./json/api.json')
    const data = await response.json()

    const config = data[0]

    api = config.conexionRemota
        ? config.apiOnline
        : config.apiLocal
}

/* promesa global */
const apiReady = cargarConfiguracionAPI()