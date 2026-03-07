'''
Trabajo Final
"La Pastelería"
'''
# -------------------------------------------------------------------------------------------------
# Importación de módulos --------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename

import mysql.connector
import os
import time

app = Flask(__name__)
CORS(app)

# -------------------------------------------------------------------------------------------------
# Definición de clase y métodos -------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

class Conexion:
    # Conexión a la BD ----------------------------------------------------------------------------
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password,
            database = database,
            auth_plugin = 'mysql_native_password' # Plugin de contraseñas
        )

        self.cursor = self.conn.cursor(dictionary=True)

        #self.conn.cursor(dictionary=True)

    # Consultar Usuario ---------------------------------------------------------------------------
    def consultar_usuario(self, email):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}'")
        usuario = self.cursor.fetchone()

        if usuario:
            return jsonify({"existe": 1})
        
        return jsonify({"existe": 0})
    
    # Consultar Contraseña ------------------------------------------------------------------------
    def consultar_email_passw(self, email, passw):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}' AND passw = '{passw}'")
        usuario = self.cursor.fetchone()

        if usuario:
            return True
        
        return False

    # Ver todos los productos activos -------------------------------------------------------------
    def ver_productos(self):
        self.cursor.execute("SELECT * FROM productos WHERE activo = 1")
        productos = self.cursor.fetchall()
        return productos
    
    # Ver todos los productos inactivos -----------------------------------------------------------
    def ver_productos_inactivos(self):
        self.cursor.execute("SELECT * FROM productos WHERE activo = 0")
        productos = self.cursor.fetchall()
        return productos

    # Ver todos los cupones -----------------------------------------------------------------------
    def ver_cupones(self):
        self.cursor.execute("SELECT * FROM cupones")
        productos = self.cursor.fetchall()
        return productos

    # Consultar productos por ID ------------------------------------------------------------------
    def consultar_producto(self, id):
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        producto = self.cursor.fetchone()

        if producto:
            return producto
        
        return False

    # Agregar productos ---------------------------------------------------------------------------
    def agregar_producto(self, nombre, url, imagen, descripcion, porciones, precio, activo):
        # self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        # producto = self.cursor.fetchone()

        # if producto:
        #     return False
        
        sql = f"INSERT INTO productos (nombre, url, imagen, descripcion, porciones, precio, activo)\
                VALUES ('{nombre}', '{url}', '{imagen}', '{descripcion}', {porciones}, {precio}, {activo});"        
        self.cursor.execute(sql)
        self.conn.commit()
        return True

    # Modificar un producto -----------------------------------------------------------------------
    def modificar_producto(self, id, nombre, url, imagen, descripcion, porciones, precio, activo):
        sql = f"UPDATE productos SET nombre = '{nombre}', url = '{url}', imagen = '{imagen}', descripcion = '{descripcion}', porciones = {porciones}, precio = {precio}, activo = {activo} WHERE id = {id};"        
        self.cursor.execute(sql)
        self.conn.commit()
        return True
    
    # Activar o desactivar un producto ------------------------------------------------------------
    def estado_producto(self, id, activo):
        sql = f"UPDATE productos SET activo = {activo} WHERE id = {id};"        
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #Si se modificó una línea, rowcount() será mayor que 0 y devolverá True. Si no se modificó nada por algun error, rowcount() no será mayor a 0 y devolverá False
    
    # Eliminar un producto ------------------------------------------------------------------------
    def eliminar_producto(self, id):
        sql = f"DELETE FROM productos WHERE id = {id}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #Si se borró una línea, rowcount() será mayor que 0 y devolverá True. Si no se borró nada por algun error, rowcount() no será mayor a 0 y devolverá False
    
    # NOTA: En el futuro eliminar f-strings para evitar SQL injection!!!
    
# -------------------------------------------------------------------------------------------------
# Cuerpo del programa -----------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

# Datos conexión ----------------------------------------------------------------------------------

host = 'localhost'
usuario = 'root'
passw = 'root'
baseDatos = 'pasteleria'

# host = 'emanuel.mysql.pythonanywhere-services.com'
# usuario = 'emanuel'
# passw = 'cac23511'
# baseDatos = 'emanuel$pasteleria'

db = Conexion(host, usuario, passw, baseDatos) # Inicio clase Conexion a la base de datos

# Ruta inicial ------------------------------------------------------------------------------------
@app.route("/")
def inicio():
    # return render_template("inicio.html") - Se puede crear un archivo HTML para mostrar en una ruta determinada usando este método
    return "<h1>Servidor</h1> \
            <p> \
            UTN-FRT <br> \
            Trabajo Final <br> \
            'La Pastelería' <br> \
            </p>"

# Ruta chequear usuario -------------------------------------------------------------------------
@app.route("/usuario/<string:email>/<string:passw>")
def consultar_email_passw(email, passw):
    
    # Consultar usuario
    usuario = db.consultar_email_passw(email, passw)

    if usuario:
        return jsonify({"acceso": 1})
    else:
        return jsonify({"acceso": 0})

# Ruta mostrar cupones --------------------------------------------------------------------------
@app.route("/cupones", methods=["GET"])
def ver_cupones():

    # Mostrar cupones
    cupones = db.ver_cupones()

    return jsonify(cupones)

# Ruta mostrar productos --------------------------------------------------------------------------
@app.route("/productos", methods=["GET"])
def ver_productos():

    # Mostrar productos
    productos = db.ver_productos()

    return jsonify(productos)

# Ruta mostrar productos inactivos ----------------------------------------------------------------
@app.route("/productos/inactivos", methods=["GET"])
def ver_productos_inactivos():

    # Mostrar productos
    productos = db.ver_productos_inactivos()

    return jsonify(productos)

# Ruta mostrar un producto por ID -----------------------------------------------------------------
@app.route("/productos/<int:id>")
def consultar_producto(id):

    # Mostrar producto
    producto = db.consultar_producto(id)

    if producto:
        return jsonify(producto)
    else:
        return jsonify({"mensaje": 404})

# Carpeta para guardar las imágenes ---------------------------------------------------------------
ruta_destino = './static/imagenes/'

# Ruta agregar producto ---------------------------------------------------------------------------
@app.route("/productos", methods=["POST"])
def agregar_producto():

    # Datos del producto
    nombre = request.form['nombre']
    url = request.form['url']
    imagen = request.form['imagen']
    descripcion = request.form['descripcion']
    porciones = request.form['porciones']
    precio = request.form['precio']
    activo = request.form['activo']

    # imagen = request.files['imagen']
    # nombre_imagen = secure_filename(imagen.filename)
    # print("*"*20)
    # print(nombre_imagen)
    # print("*"*20)
    # nombre_base, extension = os.path.splitext(nombre_imagen)
    # nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
    # imagen.save(os.path.join(ruta_destino, nombre_imagen))

    # Agregar producto
    agregar = db.agregar_producto(nombre, url, imagen, descripcion, porciones, precio, activo)

    if agregar:
        return jsonify({"mensaje": "Producto agregado correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar agregar el producto"})

# Ruta actualizar producto ------------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["PUT"])
def modificar_producto(id):

    # Datos del producto
    data = request.form
    #id = data.get("id")
    nuevo_nombre = data.get("nombre")
    nueva_url = data.get("url")
    nueva_imagen = data.get("imagen")
    nueva_descripcion = data.get("descripcion")
    nuevo_porciones = data.get("porciones")
    nuevo_precio = data.get("precio")
    activo = data.get("activo")

    # Actualización del producto
    actualizar = db.modificar_producto(id, nuevo_nombre, nueva_url, nueva_imagen, nueva_descripcion, nuevo_porciones, nuevo_precio, activo)

    if actualizar:
        return jsonify({"mensaje": "Producto modificado correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar actualizar el producto"})
    
# Ruta activar o desactivar producto --------------------------------------------------------------
@app.route("/productos/<int:id>/activo", methods=["PUT"])
def estado_producto(id):

    # Datos del producto
    data = request.form
    activo = data.get("activo")

    # Activar o desactivar producto
    activar = db.estado_producto(id, activo)

    if activar:
        return jsonify({"mensaje": "Disponibilidad del producto modificada correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar modificar disponibilidad del producto"})

# Ruta eliminar producto --------------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["DELETE"])
def eliminar_producto(id):

    #Eliminar producto
    eliminar = db.eliminar_producto(id)

    if eliminar:
        return jsonify({"mensaje": "Producto eliminado correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar eliminar el producto"})
    
# -------------------------------------------------------------------------------------------------
# Iniciar servidor --------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

print("\033[H\033[j") # Borrado de consola

if __name__ == "__main__":
    app.run(debug=True)