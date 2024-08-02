# Proyecto Final - CoderHouse - Backend

Alumno: Daniel Diaz

Comisión: 70020

Docente: Luis Alejandro Mera

Tutores: Abigail Salas, Alexis Coronel

## Descripción del Proyecto

Este proyecto es un servidor básico de e-commerce desarrollado con Node.js y Express. Permite gestionar productos y carritos de compra, ofreciendo funcionalidades como la adición, eliminación y actualización de productos en tiempo real mediante WebSockets.

## Instalación

### Requisitos Previos

- Node.js v14 o superior
- MongoDB

### Pasos de Instalación

1. Clonar el repositorio:

\`\`\`sh
git clone https://github.com/Dragunovich1/proyecto-final-backend-daniel-diaz
cd proyecto-final-backend-daniel-diaz
\`\`\`

2. Instalar las dependencias:

\`\`\`sh
npm install
\`\`\`

3. Configurar la base de datos:

Asegúrate de tener una instancia de MongoDB corriendo. Puedes usar la configuración por defecto en \`mongodb://localhost:27017/base_de_datos\` o modificar la configuración en \`app.js\`.

## Ejecución del Servidor

### Modo Desarrollo

Para ejecutar el servidor en modo desarrollo (con reinicio automático):

\`\`\`sh
npm run dev
\`\`\`

### Modo Producción

Para ejecutar el servidor en modo producción:

\`\`\`sh
npm start
\`\`\`

El servidor estará corriendo en \`http://localhost:8080\`.

## Vistas

### Dashboard

- **URL**: \`http://localhost:8080\`
- **Descripción**: Muestra la lista de productos disponibles, permite acceder al resto de las vistas, se pueden realizar todas las pruebas desde aqui.

### Productos en Tiempo Real

- **URL**: \`http://localhost:8080/realtimeproducts\`
- **Descripción**: Muestra una lista de productos que se actualiza en tiempo real. Permite agregar y eliminar productos.

### Carrito de Compras

- **URL**: \`http://localhost:8080/carts/:cid\`
- **Descripción**: Muestra los productos en el carrito específico. Permite incrementar, decrementar y eliminar productos del carrito.

### Detalle de Producto

- **URL**: \`http://localhost:8080/products/:pid\`
- **Descripción**: Muestra los detalles de un producto específico y permite agregarlo al carrito.


## Instrucciones de Uso

3. Acceder a las siguientes rutas desde el navegador:

- \`http://localhost:8080\` para ver el dashboard con la lista de productos.
- \`http://localhost:8080/realtimeproducts\` para gestionar productos en tiempo real.
- \`http://localhost:8080/carts/:cid\` para ver y gestionar el carrito de compras.
- \`http://localhost:8080/products/:pid\` para ver los detalles de un producto específico.

4. Se agregó una interfaz grafica a modo de dashboard para realizar las pruebas necesarias.

## Testing

Para realizar pruebas, puedes utilizar herramientas como Postman o Insomnia para enviar solicitudes HTTP a las rutas de la API. Asegúrate de tener la base de datos MongoDB corriendo y correctamente configurada.

### Ejemplos de Pruebas Manuales

1. **Agregar Producto**:
   - Endpoint: \`POST /api/products\`
   - Body: \`{ "name": "Producto", "description": "Descripción", "category": "Categoría", "price": 1000, "stock": 10 }\`

2. **Eliminar Producto**:
   - Endpoint: \`DELETE /api/products/:pid\`

3. **Agregar Producto al Carrito**:
   - Endpoint: \`POST /api/carts/:cid/product/:pid\`

4. **Eliminar Producto del Carrito**:
   - Endpoint: \`DELETE /api/carts/:cid/product/:pid\`

5. **Actualizar Cantidad de Producto en el Carrito**:
   - Endpoint: \`PUT /api/carts/:cid/product/:pid\`
   - Body: \`{ "quantity": 2 }\`