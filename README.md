# Aplicación Backend E-Commerce **CoderHouse**

# E-Commerce

Desarrollar una aplicación de e-commerce para vender productos de un rubro a elección.

## Tabla de Contenidos
1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Uso](#uso)
4. [Estructura del Proyecto](#estructura-del-proyecto)

## Instalación
### Requisitos previos
- mkdir ecommerce
- cd ecommerce
- npm init -y
- npm install express


### Instrucciones de instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/devjosilva/Backend.git

## Configuración
### Variables de entorno
`PORT`: El puerto en el que la aplicación se ejecutará (por defecto puerto: 8089).\
        Nota: por laburo tengo una APP instalada que utiliza puerto 8080


## Uso
- Inicia el servidor node app.js
### Endpoints de la API: Productos
**GET** `/api/products`: Listar todos los productos.\
        `limit`: Número máximo de productos a devolver.\
**GET** `/api/products/:pid`: Obtener un producto por ID.\
**POST** `/api/products`: Agregar un nuevo producto.
### Cuerpo de la solicitud
{
    "title": "string",
    "description": "string",
    "code": "string",
    "price": number,
    "status": boolean,
    "stock": number,
    "category": "string",
    "thumbnails": ["string"]
}
**PUT** `/api/products/:pid`: Actualizar un producto por ID.\
### Cuerpo de la solicitud
{
    "title": "string",
    "description": "string",
    "code": "string",
    "price": number,
    "status": boolean,
    "stock": number,
    "category": "string",
    "thumbnails": ["string"]
}
### Data de ejemplo
La carpeta data contiene los archivos carts.json y products.json que contienen la estructura a definir proximamente en la base datos.
### Autenticación y autorización
La API no utiliza autenticación.
## Estructura del proyecto
```
ecommerce/
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── products.png
│   │       ├── productbyid.png
│   │       └── cartsbyid.png
│   ├── data/
│   │   ├── products.json
│   │   └── carts.json
│   │
│   ├── routes/
│   │       ├── products.js
│   │       └── carts.js
│   │
│   ├── app.js
│   └── utils/
│           ├── datosEjemplos.json
│           └── fileUtils.js
├── .gitignore    
├── package-lock.json    
├── package.json    
└── README.md    

```
![Listado de productos](src/assets/images/products.png)
![Producto por ID](src/assets/images/productbyid.png)
![Añadir Producto](src/assets/images/addproduct.png)
![Añadir Producto](src/assets/images/addproduct2.png)
![Carrito por ID](src/assets/images/cartsbyid.png)
