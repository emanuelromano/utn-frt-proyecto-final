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

# Bae de datos
import mysql.connector
import os
import time

# Envío de mail
import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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
    
    # Consultar Usuario y Contraseña --------------------------------------------------------------
    # def consultar_email_passw(self, email, passw):
    #     self.cursor.execute(f"SELECT * FROM usuarios WHERE email = '{email}' AND passw = '{passw}'")
    #     usuario = self.cursor.fetchone()

    #     if usuario:
    #         return True
        
    #     return False

    # Consultar email y contraseña ---------------------------------------------------------------
    def consultar_email_passw(self, email, passw):
        self.cursor.execute(f"SELECT id, nombre, apellido, administrador FROM usuarios WHERE email = '{email}' AND passw = '{passw}'")

        usuario = self.cursor.fetchone()

        if usuario:
            return usuario
        else:
            return None
    
    # Obtener datos del dashboard -----------------------------------------------------------------
    def obtener_dashboard(self):

        query = """
        SELECT
        (SELECT COUNT(*) FROM productos) AS productos_totales,
        (SELECT COUNT(*) FROM productos WHERE activo = 1) AS productos_activos,
        (SELECT COUNT(*) FROM productos WHERE activo = 0) AS productos_inactivos,
        (SELECT COUNT(*) FROM cupones) AS cupones_totales,
        (SELECT COUNT(*) FROM usuarios) AS usuarios_totales
        """

        self.cursor.execute(query)
        datos = self.cursor.fetchone()

        return datos
    
    # Cantidad total de productos -----------------------------------------------------------------
    def total_productos(self):
        query = "SELECT COUNT(*) AS total FROM productos WHERE activo = 1"
        self.cursor.execute(query)

        resultado = self.cursor.fetchone()
        total = resultado["total"]

        return total

    # Ver productos activos con paginación --------------------------------------------------------
    def ver_productos(self, pagina, limite):
        offset = (pagina - 1) * limite

        query = """
            SELECT *
            FROM productos
            WHERE activo = 1
            LIMIT %s OFFSET %s
        """

        self.cursor.execute(query, (limite, offset))
        productos = self.cursor.fetchall()

        return productos
    
    # Cantidad total de productos inactivos -------------------------------------------------------
    def total_productos_inactivos(self):

        query = "SELECT COUNT(*) AS total FROM productos WHERE activo = 0"
        self.cursor.execute(query)

        resultado = self.cursor.fetchone()

        return resultado["total"]
    
    # Ver productos inactivos con paginación ------------------------------------------------------
    def ver_productos_inactivos(self, pagina, limite):

        offset = (pagina - 1) * limite

        query = """
            SELECT *
            FROM productos
            WHERE activo = 0
            LIMIT %s OFFSET %s
        """

        self.cursor.execute(query, (limite, offset))
        productos = self.cursor.fetchall()

        return productos

    # Ver todos los cupones activos ---------------------------------------------------------------
    def ver_cupones(self):
        self.cursor.execute("SELECT * FROM cupones WHERE activo = 1")
        cupones = self.cursor.fetchall()
        return cupones
    
    # Ver todos los cupones inactivos -------------------------------------------------------------
    def ver_cupones_inactivos(self):
        self.cursor.execute("SELECT * FROM cupones WHERE activo = 0")
        cupones = self.cursor.fetchall()
        return cupones

    # Consultar productos por ID ------------------------------------------------------------------
    def consultar_producto(self, id):
        self.cursor.execute(f"SELECT * FROM productos WHERE id = {id}")
        producto = self.cursor.fetchone()

        if producto:
            return producto
        
        return False
    
    # Consultar cupones por ID --------------------------------------------------------------------
    def consultar_cupon(self, id):
        self.cursor.execute(f"SELECT * FROM cupones WHERE id = {id}")
        cupon = self.cursor.fetchone()

        if cupon:
            return cupon
        
        return False
    
    # Generar URL única
    def generar_url_unica(self, url_base):
        url = url_base
        contador = 2

        while True:

            self.cursor.execute("SELECT id FROM productos WHERE url = %s", (url,))
            existe = self.cursor.fetchone()

            if not existe:
                return url

            url = f"{url_base}-{contador}"
            contador += 1

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
    
    # Agregar cupón -------------------------------------------------------------------------------
    def agregar_cupon(self, cupon, descuento, texto, activo):

        sql = f"""INSERT INTO cupones (cupon, descuento, texto, activo)
                VALUES ('{cupon}', {descuento}, '{texto}', {activo});"""

        self.cursor.execute(sql)
        self.conn.commit()

        return True

    # Modificar un producto -----------------------------------------------------------------------
    def modificar_producto(self, id, nombre, url, imagen, descripcion, porciones, precio, activo):
        sql = f"UPDATE productos SET nombre = '{nombre}', url = '{url}', imagen = '{imagen}', descripcion = '{descripcion}', porciones = {porciones}, precio = {precio}, activo = {activo} WHERE id = {id};"        
        self.cursor.execute(sql)
        self.conn.commit()
        return True
    
    # Modificar un cupón -----------------------------------------------------------------------
    def modificar_cupon(self, id, cupon, texto, descuento, activo):
        sql = f"""UPDATE cupones 
                SET cupon = '{cupon}',
                    texto = '{texto}',
                    descuento = {descuento},
                    activo = {activo}
                WHERE id = {id};"""

        self.cursor.execute(sql)
        self.conn.commit()

        return True
    
    # Activar o desactivar un producto ------------------------------------------------------------
    def estado_producto(self, id, activo):
        sql = f"UPDATE productos SET activo = {activo} WHERE id = {id};"        
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #Si se modificó una línea, rowcount() será mayor que 0 y devolverá True. Si no se modificó nada por algun error, rowcount() no será mayor a 0 y devolverá False
    
    # Activar o desactivar un cupón ---------------------------------------------------------------
    def estado_cupon(self, id, activo):
        sql = f"UPDATE cupones SET activo = {activo} WHERE id = {id};"        
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #Si se modificó una línea, rowcount() será mayor que 0 y devolverá True. Si no se modificó nada por algun error, rowcount() no será mayor a 0 y devolverá False

    
    # Eliminar un producto ------------------------------------------------------------------------
    def eliminar_producto(self, id):
        sql = f"DELETE FROM productos WHERE id = {id}"
        self.cursor.execute(sql)
        self.conn.commit()
        return self.cursor.rowcount > 0 #Si se borró una línea, rowcount() será mayor que 0 y devolverá True. Si no se borró nada por algun error, rowcount() no será mayor a 0 y devolverá False
    
    # Ver todos los usuarios activos
    def ver_usuarios(self):
        self.cursor.execute("SELECT * FROM usuarios WHERE activo = 1")
        usuarios = self.cursor.fetchall()
        return usuarios

    # Ver usuarios inactivos
    def ver_usuarios_inactivos(self):
        self.cursor.execute("SELECT * FROM usuarios WHERE activo = 0")
        usuarios = self.cursor.fetchall()
        return usuarios

    # Buscar usuario por ID
    def consultar_usuario_id(self, id):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE id = {id}")
        usuario = self.cursor.fetchone()

        if usuario:
            return usuario
        return False

    # Agregar usuario
    def agregar_usuario(self, nombre, apellido, email, passw, administrador, activo):

        sql = f"""
        INSERT INTO usuarios (nombre, apellido, email, passw, administrador, activo)
        VALUES ('{nombre}', '{apellido}', '{email}', '{passw}', {administrador}, {activo})
        """

        self.cursor.execute(sql)
        self.conn.commit()

        return True

    # Modificar usuario
    def modificar_usuario(self, id, nombre, apellido, email, passw, administrador):

        sql = f"""
        UPDATE usuarios
        SET nombre = '{nombre}',
            apellido = '{apellido}',
            email = '{email}',
            passw = '{passw}',
            administrador = {administrador}
        WHERE id = {id}
        """

        self.cursor.execute(sql)
        self.conn.commit()

        return True

    # Activar o desactivar usuario
    def estado_usuario(self, id, activo):

        sql = f"UPDATE usuarios SET activo = {activo} WHERE id = {id}"

        self.cursor.execute(sql)
        self.conn.commit()

        return self.cursor.rowcount > 0
    
    # Generar código de recuperación --------------------------------------------------------------
    def generar_codigo_recuperacion(self, email, codigo, expira):
        sql = """
        UPDATE usuarios
        SET reset_code = %s,
            reset_expira = %s
        WHERE email = %s
        """

        self.cursor.execute(sql, (codigo, expira, email))
        self.conn.commit()

        return self.cursor.rowcount > 0
    
    # Verificar código de recuperación ------------------------------------------------------------
    def verificar_codigo_recuperacion(self, email, codigo):
        sql = """
        SELECT *
        FROM usuarios
        WHERE email = %s
        AND reset_code = %s
        AND reset_expira > NOW()
        """

        self.cursor.execute(sql, (email, codigo))
        usuario = self.cursor.fetchone()

        return usuario
    
    # Cambiar contraseña usando código ------------------------------------------------------------
    def cambiar_password_recuperacion(self, email, nueva_pass):
        sql = """
        UPDATE usuarios
        SET passw = %s,
            reset_code = NULL,
            reset_expira = NULL
        WHERE email = %s
        """

        self.cursor.execute(sql, (nueva_pass, email))
        self.conn.commit()

        return self.cursor.rowcount > 0
    
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
            TUP - Trabajo Final <br> \
            'La Pastelería' <br> \
            Programado por Emanuel Romano <br> \
            Legajo 55066 <br> \
            </p>"

# Ruta chequear usuario -------------------------------------------------------------------------
@app.route("/usuario/login", methods=["POST"])
def login():

    email = request.form['email']
    passw = request.form['passw']

    usuario = db.consultar_email_passw(email, passw)
    
    if usuario:
        return jsonify({
            "acceso":1,
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "apellido": usuario["apellido"],
            "administrador": usuario["administrador"]
        })
    else:
        return jsonify({"acceso":0})

# Ruta dashboard admin ----------------------------------------------------------------------------
@app.route("/admin/dashboard", methods=["GET"])
def dashboard():

    datos = db.obtener_dashboard()

    return jsonify(datos)

# Ruta mostrar cupones activos --------------------------------------------------------------------
@app.route("/cupones", methods=["GET"])
def ver_cupones():

    # Mostrar cupones
    cupones = db.ver_cupones()

    return jsonify(cupones)

# Ruta mostrar cupones inactivos ------------------------------------------------------------------
@app.route("/cupones/inactivos", methods=["GET"])
def ver_cupones_inactivos():

    # Mostrar cupones
    cupones = db.ver_cupones_inactivos()

    return jsonify(cupones)

# Ruta mostrar productos con paginación -----------------------------------------------------------
@app.route("/productos", methods=["GET"])
def ver_productos():

    pagina = request.args.get("pagina", default=1, type=int)
    limite = request.args.get("limite", default=12, type=int)

    productos = db.ver_productos(pagina, limite)
    total = db.total_productos()

    return jsonify({
        "productos": productos,
        "pagina": pagina,
        "limite": limite,
        "total": total
    })

# Ruta mostrar productos inactivos con paginación -------------------------------------------------
@app.route("/productos/inactivos", methods=["GET"])
def ver_productos_inactivos():

    pagina = request.args.get("pagina", default=1, type=int)
    limite = request.args.get("limite", default=12, type=int)

    productos = db.ver_productos_inactivos(pagina, limite)
    total = db.total_productos_inactivos()

    return jsonify({
        "productos": productos,
        "pagina": pagina,
        "limite": limite,
        "total": total
    })

# Ruta mostrar un producto por ID -----------------------------------------------------------------
@app.route("/productos/<int:id>")
def consultar_producto(id):

    # Mostrar producto
    producto = db.consultar_producto(id)

    if producto:
        return jsonify(producto)
    else:
        return jsonify({"mensaje": 404})
    
# Ruta mostrar un cupón por ID --------------------------------------------------------------------
@app.route("/cupones/<int:id>")
def consultar_cupon(id):

    # Mostrar producto
    cupon = db.consultar_cupon(id)

    if cupon:
        return jsonify(cupon)
    else:
        return jsonify({"mensaje": 404})

# Carpeta para guardar las imágenes ---------------------------------------------------------------
ruta_destino = './static/imagenes/'

# Ruta agregar producto ---------------------------------------------------------------------------
@app.route("/productos", methods=["POST"])
def agregar_producto():

    # Datos del producto
    nombre = request.form['nombre']
    url = db.generar_url_unica(request.form['url'])
    imagen = request.form['imagen']
    descripcion = request.form['descripcion']
    porciones = request.form['porciones']
    precio = request.form['precio']
    activo = request.form['activo']

    # Agregar producto
    agregar = db.agregar_producto(nombre, url, imagen, descripcion, porciones, precio, activo)

    if agregar:
        return jsonify({"mensaje": "Producto agregado correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar agregar el producto"})

# Ruta agregar cupón ------------------------------------------------------------------------------
@app.route("/cupones", methods=["POST"])
def agregar_cupon():

    cupon = request.form['cupon']
    descuento = request.form['descuento']
    texto = request.form['texto']
    activo = request.form['activo']

    agregar = db.agregar_cupon(cupon, descuento, texto, activo)

    if agregar:
        return jsonify({"mensaje": "Cupón agregado correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar agregar el cupón"})

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
    
# Ruta actualizar cupón --------------------------------------------------------------------
@app.route("/cupones/<int:id>", methods=["PUT"])
def modificar_cupon(id):

    data = request.form

    cupon = data.get("cupon")
    texto = data.get("texto")
    descuento = data.get("descuento")
    activo = data.get("activo")

    actualizar = db.modificar_cupon(id, cupon, texto, descuento, activo)

    if actualizar:
        return jsonify({"mensaje": "Cupón modificado correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar modificar el cupón"})

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
    
# Ruta activar o desactivar cupon -----------------------------------------------------------------
@app.route("/cupones/<int:id>/activo", methods=["PUT"])
def estado_cupon(id):

    # Datos del producto
    data = request.form
    activo = data.get("activo")

    # Activar o desactivar producto
    activar = db.estado_cupon(id, activo)

    if activar:
        return jsonify({"mensaje": "Disponibilidad del cupón modificada correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar modificar disponibilidad del cupón"})

# Ruta eliminar producto --------------------------------------------------------------------------
@app.route("/productos/<int:id>", methods=["DELETE"])
def eliminar_producto(id):

    #Eliminar producto
    eliminar = db.eliminar_producto(id)

    if eliminar:
        return jsonify({"mensaje": "Producto eliminado correctamente"})
    else:
        return jsonify({"mensaje": "Error al intentar eliminar el producto"})

# Ruta ver usuarios activos -----------------------------------------------------------------------
@app.route("/usuarios", methods=["GET"])
def ver_usuarios():

    usuarios = db.ver_usuarios()

    return jsonify(usuarios)

# Ruta ver usuarios inactivos ---------------------------------------------------------------------
@app.route("/usuarios/inactivos", methods=["GET"])
def ver_usuarios_inactivos():

    usuarios = db.ver_usuarios_inactivos()

    return jsonify(usuarios)

# Ruta buscar usuario por ID ----------------------------------------------------------------------
@app.route("/usuarios/<int:id>")
def consultar_usuario_id(id):

    usuario = db.consultar_usuario_id(id)

    if usuario:
        return jsonify(usuario)
    else:
        return jsonify({"mensaje":404})

# Ruta agregar usuario ----------------------------------------------------------------------------
@app.route("/usuarios", methods=["POST"])
def agregar_usuario():

    nombre = request.form['nombre']
    apellido = request.form['apellido']
    email = request.form['email']
    passw = request.form['passw']
    administrador = request.form['administrador']
    activo = request.form['activo']

    agregar = db.agregar_usuario(nombre, apellido, email, passw, administrador, activo)

    if agregar:
        return jsonify({"mensaje":"Usuario agregado correctamente"})
    else:
        return jsonify({"mensaje":"Error al agregar usuario"})

# Ruta modificar usuario ----------------------------------------------------------------------------
@app.route("/usuarios/<int:id>", methods=["PUT"])
def modificar_usuario(id):

    data = request.form

    nombre = data.get("nombre")
    apellido = data.get("apellido")
    email = data.get("email")
    passw = data.get("passw")
    administrador = data.get("administrador")

    actualizar = db.modificar_usuario(id, nombre, apellido, email, passw, administrador)

    if actualizar:
        return jsonify({"mensaje":"Usuario actualizado correctamente"})
    else:
        return jsonify({"mensaje":"Error al actualizar usuario"})   

# Ruta activar o desactivar usuario ---------------------------------------------------------------
@app.route("/usuarios/<int:id>/activo", methods=["PUT"])
def estado_usuario(id):

    data = request.form
    activo = data.get("activo")

    activar = db.estado_usuario(id, activo)

    if activar:
        return jsonify({"mensaje":"Estado de usuario modificado correctamente"})
    else:
        return jsonify({"mensaje":"Error al modificar estado"})
    


import random
from datetime import datetime, timedelta

# Ruta solicitar recuperación contraseña por email ------------------------------------------------
@app.route("/usuarios/recuperar", methods=["POST"])
def recuperar_password():
    email = request.form['email']
    codigo = random.randint(100000, 999999)
    expira = datetime.now() + timedelta(minutes=10)

    ok = db.generar_codigo_recuperacion(email, codigo, expira)

    if ok:
        # luego aquí enviaremos email
        print("Codigo de recuperacion:", codigo)

        return jsonify({"mensaje": "Codigo enviado"})
    else:
        return jsonify({"mensaje": "Email no encontrado"})

# Ruta cambiar contraseña -------------------------------------------------------------------------
@app.route("/usuarios/reset", methods=["POST"])
def reset_password():
    email = request.form['email']
    codigo = request.form['codigo']
    nueva_pass = request.form['password']

    usuario = db.verificar_codigo_recuperacion(email, codigo)

    if not usuario:
        return jsonify({"mensaje": "Codigo invalido o expirado"})

    ok = db.cambiar_password_recuperacion(email, nueva_pass)

    if ok:
        return jsonify({"mensaje": "Password actualizada"})
    else:
        return jsonify({"mensaje": "Error al actualizar"})



# -------------------------------------------------------------------------------------------------
# Iniciar servidor --------------------------------------------------------------------------------
# -------------------------------------------------------------------------------------------------

print("\033[H\033[j") # Borrado de consola

if __name__ == "__main__":
    app.run(debug=True) # debug=True muestra en consola las peticiones HTTP que llegan