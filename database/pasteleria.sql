create database pasteleria;

use pasteleria;

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
values ("Selva Negra", "selva-negra", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 5500, 1),
("Lemon Pie", "lemon-pie", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/2.jpg", "Tarta formada por una base de masa quebrada u hojaldre rellena con crema de limón.", 8, 2600, 1),
("Torta Rogel", "torta-rogel", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/3.jpg", "Capas de discos de masa Rogel crocante, relleno de dulce de leche con chips de chocolate y terminado con merengue italiano.", 8, 3500, 1),
("Red Velvet", "red-velvet", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/4.jpg", "Bizcocho de color rojo en capas, relleno con crema y con un glaseado de crema de queso.", 8, 6000, 1),
("Carrot Cake", "carrot-cake", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/5.jpg", "Budín de zanahoria, con una pizca de canela, cubierto con un frosting de queso crema dulce y topping de almendras tostadas.", 8, 4800, 1),
("Cheese Cake", "cheese-cake", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/6.jpg", "Base crocante de galletas y manteca, crema de queso y limón combinada con una perfecta confitura casera de frambuesa.", 8, 5000, 1),
("Chocotorta", "chocotorta", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/7.jpg", "Siete capas de Chocolinas intercaladas con crema de dulce de leche repostero.", 8, 4700, 1),
("Torta Matcha", "torta-matcha", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/8.jpg", "Una suave y delicada torta de té verde (matcha) y un mousse de chocolate blanco.", 8, 6600, 1),
("Torta de Chocolate y Licor", "torta-de-chocolate-y-licor", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/9.jpg", "Tres capas de bizcocho de chocolate unidas por de un delicioso merengue de licor de whisky.", 8, 7000, 1);


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
