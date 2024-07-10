# Aplicación Backend E-Commerce **CoderHouse**

# E-Commerce

Desarrollar una aplicación de e-commerce para vender productos de un rubro a elección.

## Tabla de Contenidos
1. [Instalación](#instalación)
2. [Configuración](#configuración)
3. [Uso](#uso)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Desarrollo](#desarrollo)
6. [Despliegue](#despliegue)
7. [Contribuir](#contribuir)
8. [Licencia](#licencia)
9. [Autores y Reconocimientos](#autores-y-reconocimientos)
10. [Contactos y Soporte](#contactos-y-soporte)

## Instalación
### Requisitos previos
- mkdir ecommerce
- cd ecommerce
- npm init -y
- npm install express


### Instrucciones de instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/usuario/proyecto.git

## Configuración
### Variables de entorno
`PORT`: El puerto en el que la aplicación se ejecutará (por defecto: 3000).\
`DB_URI`: URI de conexión a la base de datos.
### Archivos de configuración
`config/default.json`: Configuración por defecto.
`config/production.json`: Configuración para producción.

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

### Autenticación y autorización
La API utiliza JWT para la autenticación. Incluye el token en el encabezado `Authorization`.
## Estructura del proyecto
```
ecommerce/
├── src/
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
## Desarrollo
### Guías de estilo
Sigue las guías de estilo de Airbnb.

### Procedimientos de desarrollo
1. Crea una rama nueva: `git checkout -b feature/nueva-feature`
1. Realiza tus cambios y realiza commits.
1. Envía una solicitud de pull.

### Pruebas
Ejecuta las pruebas con:
```sh
npm test
```
## Despliegue
### Entorno de producción
Para desplegar en producción, asegúrate de configurar las variables de entorno adecuadas y usa Docker para construir la imagen.
## Contribuir
### Guía de contribución
Para contribuir, por favor sigue las instrucciones.

### Código de conducta
Este proyecto sigue el Código de Conducta.
## Licencia
Este proyecto está bajo la licencia MIT. Ver el archivo LICENSE para más detalles.
## Autores y reconocimientos
* Juan Pérez - Desarrollador principal - juanperez
* María López - Contribuidor - marialopez
## Contacto y soporte
Para preguntas o soporte, contacta a juan.perez@example.com.

### Notas Adicionales
Cualquier otra información relevante.