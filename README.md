# DeDampoAcampoCRUD

## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.


##  Configuración inicial 
- Ejecutar `npm Install` desde la carpeta `api` y `client`, para instalar las dependencias necesarias para correr el test

##  Instructions
- Correr el servidor del back con `npm run start` desde la carpeta `api`
- Correr el servidor del front con `npm run dev` desde la carpeta `client`


## Base de datos
Aplicacion desarrollada en Mongoose

__Producto__:
- _ID: generado por mongoose
- name:*
- price:*

## Backend

Para inicar el proyecto

Aplicacion desarrollada en un servidor en Node/Express

 __GET /products__:: Obtener un listado de todos los productos

 __POST /products/create__:: Create products

 __PUT /products/update/:id__:: Update product

 __DELETE /products/delete/:id__:: Delete the product

### Frontend

Aplicacion desarrollada en React

__Pagina inicial__: Se muestran todos los productos
- Listado de todos los productos con sus detalles
- Opcion de poder crear, editar y eliminar un producto

__Ruta Create__: Ruta para crear un producto
- Formulario para crear un producto con validaciones

__Ruta update__: Ruta para actualziar un producto
- Formulario para editar un producto con validaciones

__Bibliotecas y Mas__: 
- Material UI
- Material UI-Icons
