/* Crear base de datos en MySQL */
create database pasteleria;
use pasteleria;


/* Tabla de USUARIOS */
CREATE TABLE usuarios (
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL,
apellido VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
passw VARCHAR(25) NOT NULL,
administrador TINYINT NOT NULL,
activo TINYINT NOT NULL,

reset_code VARCHAR(10),
reset_expira DATETIME,

PRIMARY KEY (id)
);

insert into usuarios
values (1, "Emanuel", "Romano", "eromanox@gmail.com", "123*", 1, 1, NULL, NULL),
(2, "Juan", "Pérez", "perez@gmail.com", "123*", 0, 1, NULL, NULL);



/* Tabla de PRODUCTOS */
CREATE TABLE productos (
id INT NOT NULL AUTO_INCREMENT,
nombre varchar(100) NOT NULL,
url varchar(255) UNIQUE,
imagen varchar(255),
descripcion varchar(255),
porciones int,
precio double,
activo tinyint,

PRIMARY KEY (id)
);

insert into productos (nombre, url, imagen, descripcion, porciones, precio, activo)
values ("Selva Negra", "selva-negra", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 35500, 1),
("Lemon Pie", "lemon-pie", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/2.jpg", "Tarta formada por una base de masa quebrada u hojaldre rellena con crema de limón.", 8, 22600, 1),
("Torta Rogel", "torta-rogel", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/3.jpg", "Capas de discos de masa Rogel crocante, relleno de dulce de leche con chips de chocolate y terminado con merengue italiano.", 8, 33500, 1),
("Red Velvet", "red-velvet", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/4.jpg", "Bizcocho de color rojo en capas, relleno con crema y con un glaseado de crema de queso.", 8, 36000, 1),
("Carrot Cake", "carrot-cake", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/5.jpg", "Budín de zanahoria, con una pizca de canela, cubierto con un frosting de queso crema dulce y topping de almendras tostadas.", 8, 24800, 1),
("Cheese Cake", "cheese-cake", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/6.jpg", "Base crocante de galletas y manteca, crema de queso y limón combinada con una perfecta confitura casera de frambuesa.", 8, 35000, 1),
("Chocotorta", "chocotorta", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/7.jpg", "Siete capas de Chocolinas intercaladas con crema de dulce de leche repostero.", 8, 44700, 1),
("Torta Matcha", "torta-matcha", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/8.jpg", "Una suave y delicada torta de té verde (matcha) y un mousse de chocolate blanco.", 8, 36600, 1),
("Torta de Chocolate y Licor", "torta-de-chocolate-y-licor", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/9.jpg", "Tres capas de bizcocho de chocolate unidas por de un delicioso merengue de licor de whisky.", 8, 37000, 1);

/* MOCKUPS */
insert into productos (nombre, url, imagen, descripcion, porciones, precio, activo)
values
("Torta Tres Leches", "torta-tres-leches", NULL, "Bizcochuelo esponjoso bañado en una mezcla de tres leches y cubierto con crema.", 8, 29800, 1),
("Brownie Clásico", "brownie-clasico", NULL, "Brownie húmedo de chocolate con nueces tostadas.", 8, 18900, 1),
("Tarta de Manzana", "tarta-de-manzana", NULL, "Tarta tradicional rellena de manzanas caramelizadas y canela.", 8, 22400, 1),
("Tarta de Frutillas", "tarta-de-frutillas", NULL, "Base crocante con crema pastelera y frutillas frescas.", 8, 25500, 1),
("Mousse de Chocolate", "mousse-de-chocolate", NULL, "Postre suave de chocolate con textura aireada.", 8, 21000, 1),
("Tiramisu Italiano", "tiramisu-italiano", NULL, "Capas de vainillas con café y crema mascarpone.", 8, 29500, 1),
("Budín Marmolado", "budin-marmolado", NULL, "Bizcocho suave con mezcla de vainilla y chocolate.", 8, 17600, 1),
("Pastafrola", "pastafrola", NULL, "Tarta tradicional rellena de dulce de membrillo.", 8, 19500, 1),
("Torta Oreo", "torta-oreo", NULL, "Torta cremosa con galletas Oreo trituradas.", 8, 34200, 1),
("Torta Kinder", "torta-kinder", NULL, "Torta de chocolate rellena con crema y chocolate Kinder.", 8, 38800, 1),
("Tarta de Durazno", "tarta-de-durazno", NULL, "Base crocante con crema pastelera y duraznos en almíbar.", 8, 23800, 1),
("Cheesecake de Maracuyá", "cheesecake-maracuya", NULL, "Cheesecake suave con cobertura de maracuyá.", 8, 31800, 1),
("Torta Ferrero", "torta-ferrero", NULL, "Bizcocho de chocolate con crema de avellanas y Ferrero.", 8, 42000, 1),
("Brownie con Helado", "brownie-con-helado", NULL, "Brownie tibio servido con helado de vainilla.", 8, 20800, 1),
("Tarta de Coco", "tarta-de-coco", NULL, "Tarta dulce con relleno de coco rallado.", 8, 21400, 1),
("Torta Selva Blanca", "torta-selva-blanca", NULL, "Versión clara de la selva negra con chocolate blanco.", 8, 35000, 1),
("Cupcakes de Vainilla", "cupcakes-de-vainilla", NULL, "Cupcakes esponjosos con frosting de vainilla.", 8, 19800, 1),
("Cupcakes de Chocolate", "cupcakes-de-chocolate", NULL, "Cupcakes de chocolate con cobertura cremosa.", 8, 19800, 1),
("Torta de Naranja", "torta-de-naranja", NULL, "Bizcocho suave aromatizado con naranja.", 8, 21500, 1),
("Budín de Limón", "budin-de-limon", NULL, "Budín húmedo con glaseado de limón.", 8, 18200, 1),
("Torta Mil Hojas", "torta-mil-hojas", NULL, "Capas de hojaldre con dulce de leche y crema.", 8, 33000, 1),
("Torta Sacher", "torta-sacher", NULL, "Clásica torta de chocolate con mermelada de damasco.", 8, 37200, 1),
("Tarta de Chocolate", "tarta-de-chocolate", NULL, "Tarta cremosa con intenso sabor a chocolate.", 8, 29800, 1),
("Tarta de Frutos Rojos", "tarta-frutos-rojos", NULL, "Tarta dulce con mezcla de berries.", 8, 26500, 1),
("Mousse de Maracuyá", "mousse-maracuya", NULL, "Postre aireado con sabor a maracuyá.", 8, 20500, 1),
("Torta de Almendras", "torta-de-almendras", NULL, "Bizcocho suave con harina de almendras.", 8, 29000, 1),
("Torta Banoffee", "torta-banoffee", NULL, "Banana, dulce de leche y crema sobre base crocante.", 8, 31000, 1),
("Cheesecake Oreo", "cheesecake-oreo", NULL, "Cheesecake con base de galletas Oreo.", 8, 32500, 1),
("Torta de Avellanas", "torta-avellanas", NULL, "Bizcocho húmedo con crema de avellanas.", 8, 33200, 1),
("Tarta de Pera", "tarta-de-pera", NULL, "Tarta dulce rellena con peras caramelizadas.", 8, 24500, 1),
("Torta de Chocolate Blanco", "torta-chocolate-blanco", NULL, "Bizcocho suave con crema de chocolate blanco.", 8, 35500, 1),
("Torta de Dulce de Leche", "torta-dulce-de-leche", NULL, "Capas de bizcocho rellenas con dulce de leche.", 8, 31000, 1),
("Tarta de Banana", "tarta-de-banana", NULL, "Base dulce con crema y rodajas de banana.", 8, 23500, 1),
("Tarta de Ciruela", "tarta-de-ciruela", NULL, "Tarta clásica rellena de ciruelas dulces.", 8, 22800, 1),
("Brownie de Chocolate Blanco", "brownie-chocolate-blanco", NULL, "Brownie suave con chocolate blanco.", 8, 21000, 1),
("Torta de Café", "torta-de-cafe", NULL, "Bizcocho aromatizado con café.", 8, 26000, 1),
("Tarta de Mango", "tarta-de-mango", NULL, "Tarta fresca con crema y mango.", 8, 29500, 1),
("Torta de Pistacho", "torta-de-pistacho", NULL, "Bizcocho delicado con crema de pistacho.", 8, 39800, 1),
("Cheesecake de Frutilla", "cheesecake-de-frutilla", NULL, "Cheesecake clásico con cobertura de frutillas.", 8, 31800, 1),
("Tarta de Chocolate y Naranja", "tarta-chocolate-naranja", NULL, "Chocolate intenso con toque cítrico.", 8, 30500, 1),
("Torta de Coco y Dulce de Leche", "torta-coco-dulce-de-leche", NULL, "Bizcocho de coco relleno con dulce de leche.", 8, 31500, 1),
("Tarta de Chocolate Amargo", "tarta-chocolate-amargo", NULL, "Tarta intensa de cacao amargo.", 8, 29800, 1),
("Torta de Frambuesa", "torta-frambuesa", NULL, "Bizcocho suave con relleno de frambuesa.", 8, 32500, 1),
("Cheesecake de Limón", "cheesecake-de-limon", NULL, "Cheesecake cremoso con limón.", 8, 31500, 1),
("Torta de Chocolate y Avellanas", "torta-chocolate-avellanas", NULL, "Chocolate intenso con crema de avellanas.", 8, 37200, 1),
("Tarta de Chocolate y Frutillas", "tarta-chocolate-frutillas", NULL, "Chocolate cremoso con frutillas frescas.", 8, 31000, 1),
("Torta de Almendras y Miel", "torta-almendras-miel", NULL, "Bizcocho suave con almendras y miel.", 8, 28500, 1),
("Tarta de Ricota", "tarta-de-ricota", NULL, "Tarta dulce rellena de ricota y vainilla.", 8, 23500, 1),
("Torta de Chocolate y Caramelo", "torta-chocolate-caramelo", NULL, "Chocolate con salsa de caramelo.", 8, 36000, 1);

insert into productos (nombre, url, imagen, descripcion, porciones, precio, activo)
values
("Tarta de Chocolate Oscuro", "tarta-chocolate-oscuro", NULL, "Tarta cremosa con chocolate intenso.", 8, 28000, 0),
("Torta de Maní", "torta-de-mani", NULL, "Bizcocho con crema de maní y chocolate.", 8, 31000, 0),
("Tarta de Banana y Chocolate", "tarta-banana-chocolate", NULL, "Banana fresca con crema de chocolate.", 8, 26500, 0),
("Torta de Caramelo", "torta-de-caramelo", NULL, "Bizcocho relleno con crema de caramelo.", 8, 29800, 0),
("Cheesecake de Mango", "cheesecake-mango", NULL, "Cheesecake suave con mango.", 8, 30500, 0),
("Brownie Triple Chocolate", "brownie-triple-chocolate", NULL, "Brownie con tres tipos de chocolate.", 8, 21500, 0),
("Tarta de Chocolate y Almendras", "tarta-chocolate-almendras", NULL, "Chocolate intenso con almendras.", 8, 30500, 0),
("Torta de Maracuyá", "torta-de-maracuya", NULL, "Bizcocho con crema de maracuyá.", 8, 32000, 0),
("Tarta de Limón y Coco", "tarta-limon-coco", NULL, "Combinación fresca de limón y coco.", 8, 25500, 0),
("Torta de Frutos del Bosque", "torta-frutos-del-bosque", NULL, "Bizcocho con mezcla de berries.", 8, 33500, 0),
("Tarta de Chocolate con Menta", "tarta-chocolate-menta", NULL, "Chocolate con toque refrescante de menta.", 8, 29800, 0),
("Torta de Chocolate con Naranja", "torta-chocolate-naranja", NULL, "Chocolate intenso con naranja.", 8, 31000, 0),
("Tarta de Manzana y Canela", "tarta-manzana-canela", NULL, "Manzana dulce con aroma de canela.", 8, 24000, 0),
("Cheesecake de Chocolate", "cheesecake-chocolate", NULL, "Cheesecake con chocolate cremoso.", 8, 32000, 0),
("Torta de Chocolate y Frambuesa", "torta-chocolate-frambuesa", NULL, "Chocolate con frambuesa.", 8, 34500, 0),
("Tarta de Pera y Almendras", "tarta-pera-almendras", NULL, "Pera dulce con almendras.", 8, 25500, 0),
("Torta de Chocolate y Café", "torta-chocolate-cafe", NULL, "Chocolate con toque de café.", 8, 33000, 0),
("Tarta de Chocolate Blanco y Frutillas", "tarta-chocolate-blanco-frutillas", NULL, "Chocolate blanco con frutillas.", 8, 31500, 0),
("Torta de Chocolate con Dulce de Leche", "torta-chocolate-dulce-de-leche", NULL, "Chocolate intenso con dulce de leche.", 8, 34500, 0),
("Tarta de Mango y Maracuyá", "tarta-mango-maracuya", NULL, "Combinación tropical fresca.", 8, 30500, 0);


/* Tabla de CUPONES */
create table cupones (
id int auto_increment NOT NULL,
cupon varchar(100) NOT NULL,
descuento double NOT NULL,
texto varchar(255),
activo tinyint,

primary key (`id`)
);

insert into cupones
values (1, "PRIMAVERA", 0.20, "¡Se aplicó un 20% de descuento a tu compra!", 1),
(2, "GRATIS", 1.00, "¡Se aplicó un 100% de descuento a tu compra!", 1);



/* Tabla de CLIENTES */
CREATE TABLE clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    dni INT NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
)



/* Tabla de ORDENES */
CREATE TABLE ordenes (
    id_orden INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    fecha_orden DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20),
    retirar_en_local TINYINT DEFAULT 0,
    monto_total DECIMAL(10,2),
    id_cupon INT NULL,
    descuento DECIMAL(10,2),
    monto_final DECIMAL(10,2),

    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
)

/*
ESTADOS:

pendiente
pagado
preparando
enviado
entregado
cancelado
*/



/* Tabla de DETALLE DE ORDENES */
CREATE TABLE ordenes_detalle (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_orden INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10,2),
    subtotal DECIMAL(10,2),

    FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden)
)



/* Tabla de DIRECCION DE ENVIO */
CREATE TABLE ordenes_envio (
    id_envio INT PRIMARY KEY AUTO_INCREMENT,
    id_orden INT,
    direccion VARCHAR(50),
    barrio VARCHAR(50),
    ciudad VARCHAR(30),
    codigo_postal VARCHAR(6),

    FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden)
)