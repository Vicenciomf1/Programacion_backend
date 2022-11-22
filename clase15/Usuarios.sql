-- Consultar bases de datos
SHOW DATABASES;

-- Crear base de datos llamada mibase
CREATE DATABASE mibase;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
nombre varchar(255) NOT NULL, 
apellido varchar(255) NOT NULL,
edad int UNSIGNED,
email varchar(255) NOT NULL,
id int PRIMARY KEY AUTO_INCREMENT
);

-- Verificar la tabla
SHOW TABLES;

-- Insert de 3 usuarios
INSERT INTO usuarios (nombre, apellido, edad, email) values ('Juan', 'Perez', 23, 'jp@gmail.com');
INSERT INTO usuarios (nombre, apellido, edad, email) values ('Pedro', 'Mei', 21, 'pm@gmail.com');
INSERT INTO usuarios (nombre, apellido, edad, email) values ('Juana', 'Suarez', 25, 'js@gmail.com');

-- Listar los usuarios
SELECT * FROM usuarios;

-- Borrar el usuario con id 2
DELETE FROM usuarios WHERE id = 2;

-- Cambiar de edad al usuario con id 1
UPDATE usuarios SET edad = 24 WHERE id = 1;

-- Listar los usuarios
SELECT * FROM usuarios;
