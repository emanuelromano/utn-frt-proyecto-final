create database pasteleria;

use pasteleria;

create table usuarios (
id INT NOT NULL AUTO_INCREMENT,
nombre varchar(100) NOT NULL,
apellido varchar(100) NOT NULL,
email varchar(100) NOT NULL,
passw varchar(25) NOT NULL,
administrador boolean NOT NULL,
activo boolean NOT NULL,

PRIMARY KEY (`id`)
);

insert into usuarios
values (1, "Emanuel", "Romano", "emanuel@gmail.com", "1234", true, true);


create table productos (
id INT NOT NULL AUTO_INCREMENT,
nombre varchar(100) NOT NULL,
url varchar(255),
imagen varchar(255),
descripcion varchar(255),
porciones int,
precio double,
activo boolean,

PRIMARY KEY (`id`)
);

insert into productos (nombre, url, imagen, descripcion, porciones, precio, activo)
values ("Selva Negra", "selva-negra", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/1.jpg", "Bizcochuelo de chocolate empapado en kirsch e intercaladas con nata y cerezas.", 8, 5500, true),
("Lemon Pie", "lemon-pie", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/2.jpg", "Tarta formada por una base de masa quebrada u hojaldre rellena con crema de limón.", 8, 2600, true),
("Torta Rogel", "torta-rogel", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/3.jpg", "Capas de discos de masa Rogel crocante, relleno de dulce de leche con chips de chocolate y terminado con merengue italiano.", 8, 3500, true),
("Red Velvet", "red-velvet", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/4.jpg", "Bizcocho de color rojo en capas, relleno con crema y con un glaseado de crema de queso.", 8, 6000, true),
("Carrot Cake", "carrot-cake", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/5.jpg", "Budín de zanahoria, con una pizca de canela, cubierto con un frosting de queso crema dulce y topping de almendras tostadas.", 8, 4800, true),
("Cheese Cake", "cheese-cake", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/6.jpg", "Base crocante de galletas y manteca, crema de queso y limón combinada con una perfecta confitura casera de frambuesa.", 8, 5000, true),
("Chocotorta", "chocotorta", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/7.jpg", "Siete capas de Chocolinas intercaladas con crema de dulce de leche repostero.", 8, 4700, true),
("Torta Matcha", "torta-matcha", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/8.jpg", "Una suave y delicada torta de té verde (matcha) y un mousse de chocolate blanco.", 8, 6600, true),
("Torta de Chocolate y Licor", "torta-de-chocolate-y-licor", "https://raw.githubusercontent.com/emanuelromano/utn-frt-proyecto-final/refs/heads/main/img/img-productos-backup/9.jpg", "Tres capas de bizcocho de chocolate unidas por de un delicioso merengue de licor de whisky.", 8, 7000, true);


create table cupones (
id int auto_increment not null,
cupon varchar(100),
descuento double,
texto varchar(255),
activo boolean,

primary key (`id`)
);

insert into cupones
values (1, "PRIMAVERA", 0.20, "¡Se aplicó un 20% de descuento a tu compra!", true),
(2, "GRATIS", 1.00, "Tuki. ¡Se aplicó un 100% de descuento a tu compra!", true);
