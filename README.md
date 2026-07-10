# Mil Sabores - Proyecto HTML Fullstack II

## Descripción general

**Mil Sabores** es un sitio web académico desarrollado para una pastelería artesanal.  
El proyecto simula una tienda online básica donde los usuarios pueden revisar productos, ver el detalle de cada pastel, agregar productos al carrito y utilizar formularios de contacto, inicio de sesión y registro.

El sitio fue desarrollado utilizando herramientas vistas en clases, principalmente **HTML, CSS y JavaScript**, manteniendo una estructura simple pero más ordenada y profesional.

El objetivo principal del proyecto es aplicar buenas prácticas de desarrollo web, como la separación de archivos, el uso de etiquetas semánticas, el diseño responsive y la carga dinámica de información mediante JavaScript.

---

## Objetivo del proyecto

El objetivo de este proyecto es construir una página web funcional para una pastelería llamada **Mil Sabores**, permitiendo que el usuario pueda:

- Conocer la pastelería desde la página principal.
- Revisar un catálogo de productos.
- Buscar y filtrar productos.
- Ver el detalle de cada pastel o postre.
- Agregar productos al carrito de compras.
- Simular una experiencia básica de compra.
- Enviar consultas mediante un formulario de contacto.
- Registrarse e iniciar sesión de forma básica.

Este proyecto no utiliza backend real ni base de datos, ya que está enfocado en practicar la parte visual y funcional del sitio usando tecnologías frontend.

---

## Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías:

| Tecnología | Uso dentro del proyecto |
|---|---|
| **HTML5** | Estructura de las páginas del sitio. |
| **CSS3** | Estilos personalizados, colores, tarjetas, botones y diseño responsive. |
| **JavaScript** | Funcionalidad dinámica, catálogo, detalle de productos, carrito, login y registro. |
| **Bootstrap** | Apoyo para diseño responsive, navbar, grillas y componentes visuales. |
| **LocalStorage** | Guardar productos del carrito y datos básicos de usuarios en el navegador. |
| **Visual Studio Code** | Editor de código utilizado para desarrollar el proyecto. |
| **Live Server** | Extensión utilizada para ejecutar el sitio localmente en el navegador. |

---

## Estructura del proyecto

La estructura del proyecto se organizó de forma simple para separar correctamente los archivos HTML, CSS, JavaScript e imágenes.

```text
MilSaboresHTML---Fullstack2/
│
├── index.html
├── productos.html
├── detalle.html
├── carrito.html
├── contacto.html
├── login.html
├── register.html
├── README.md
│
└── assets/
    ├── css/
    │   └── styles.css
    │
    ├── js/
    │   ├── productos-data.js
    │   ├── productos.js
    │   ├── detalle.js
    │   ├── carrito.js
    │   ├── auth.js
    │   └── main.js
    │
    └── img/
        └── imágenes del proyecto
```

Esta estructura permite que el proyecto sea más fácil de mantener, ya que cada archivo tiene una responsabilidad clara.

---

## Explicación de las páginas HTML

### `index.html`

Es la página principal del sitio.

En esta página se presenta la marca **Mil Sabores**, una descripción general de la pastelería, secciones informativas y algunos productos destacados.

Incluye:

- Menú de navegación.
- Banner principal.
- Presentación de la pastelería.
- Beneficios o características del negocio.
- Productos destacados.
- Footer con información general.

Esta página funciona como la entrada principal al sitio web.

---

### `productos.html`

Es la página del catálogo de productos.

En esta página se muestran todos los productos disponibles, pero los productos no están escritos manualmente dentro del HTML.  
La información se carga dinámicamente desde el archivo:

```text
assets/js/productos-data.js
```

Y se muestra en pantalla mediante el archivo:

```text
assets/js/productos.js
```

Incluye:

- Catálogo de productos.
- Buscador por nombre.
- Filtro por categoría.
- Botón para ver detalle.
- Botón para agregar productos al carrito.

Esta página permite que el catálogo sea más fácil de actualizar, porque si se quiere agregar un nuevo producto, solo se debe editar el arreglo de productos en JavaScript.

---

### `detalle.html`

Es la página de detalle de producto.

Una mejora importante del proyecto es que se utiliza **un solo archivo de detalle** para todos los productos.

Antes, un proyecto de este tipo podría tener varios archivos como:

```text
detalle-torta-chocolate.html
detalle-torta-frutas.html
detalle-tiramisu.html
```

Pero en esta versión se usa solamente:

```text
detalle.html
```

El producto se identifica mediante un parámetro en la URL.

Ejemplo:

```text
detalle.html?id=torta-chocolate
detalle.html?id=tiramisu-clasico
detalle.html?id=brownie-sin-gluten
```

JavaScript lee el `id` de la URL, busca el producto correspondiente dentro del arreglo de productos y muestra automáticamente:

- Imagen del producto.
- Nombre.
- Categoría.
- Descripción.
- Precio.
- Cantidad.
- Opciones de compra.
- Botón para agregar al carrito.
- Productos relacionados.

Esta solución evita repetir código y hace que el proyecto sea más profesional y escalable.

---

### `carrito.html`

Es la página donde se muestran los productos agregados al carrito.

El carrito utiliza **LocalStorage**, lo que permite guardar los productos en el navegador.  
Esto significa que si el usuario recarga la página, los productos pueden seguir apareciendo en el carrito.

Incluye:

- Lista de productos agregados.
- Cantidad de cada producto.
- Precio unitario.
- Subtotal.
- Total de la compra.
- Opción para eliminar productos.
- Opción para vaciar el carrito.

El carrito no realiza pagos reales, ya que el proyecto es académico y está enfocado en la simulación de una tienda online.

---

### `contacto.html`

Es la página de contacto del sitio.

Incluye un formulario donde el usuario puede ingresar datos como:

- Nombre.
- Correo electrónico.
- Asunto.
- Mensaje.

El formulario puede validarse con JavaScript para evitar campos vacíos y mostrar un mensaje de confirmación.

Esta página permite simular una comunicación entre el cliente y la pastelería.

---

### `login.html`

Es la página de inicio de sesión.

Permite simular el ingreso de un usuario al sitio.  
La validación se realiza con JavaScript y datos almacenados localmente.

Incluye:

- Campo de correo electrónico.
- Campo de contraseña.
- Botón para iniciar sesión.
- Enlace hacia la página de registro.

Usuario de prueba:

```text
Correo: cliente@milsabores.cl
Contraseña: 123456
```

---

### `register.html`

Es la página de registro de usuarios.

Permite simular la creación de una cuenta nueva.  
Los datos se pueden guardar en **LocalStorage** para luego iniciar sesión desde `login.html`.

Incluye:

- Nombre.
- Correo electrónico.
- Contraseña.
- Confirmación de contraseña.
- Validaciones básicas.

---

## Explicación de los archivos JavaScript

### `assets/js/productos-data.js`

Este archivo contiene la información de los productos.

Aquí se define un arreglo de objetos, donde cada producto tiene datos como:

- `id`
- `nombre`
- `categoria`
- `precio`
- `imagen`
- `descripcion`
- `detalle`

Ejemplo de un producto:

```javascript
{
  id: "torta-chocolate",
  nombre: "Torta Cuadrada de Chocolate",
  categoria: "Tortas",
  precio: 45000,
  imagen: "assets/img/TCChocolate.webp",
  descripcion: "Torta de chocolate con relleno cremoso.",
  detalle: "Ideal para celebraciones familiares y cumpleaños."
}
```

Este archivo es importante porque centraliza los datos del catálogo.

---

### `assets/js/productos.js`

Este archivo se encarga de mostrar los productos en `productos.html`.

Sus principales funciones son:

- Leer el arreglo de productos.
- Crear las tarjetas de productos dinámicamente.
- Mostrar imagen, nombre, categoría, descripción y precio.
- Permitir filtrar productos por categoría.
- Permitir buscar productos por nombre.
- Conectar cada producto con su página de detalle.
- Permitir agregar productos al carrito.

Gracias a este archivo, no es necesario escribir una tarjeta manual por cada producto en HTML.

---

### `assets/js/detalle.js`

Este archivo se encarga de la página `detalle.html`.

Sus principales funciones son:

- Leer el `id` del producto desde la URL.
- Buscar el producto correspondiente.
- Mostrar la información del producto en pantalla.
- Controlar la cantidad seleccionada.
- Agregar el producto al carrito.
- Mostrar productos relacionados.

Este archivo permite que `detalle.html` sea dinámico y reutilizable.

---

### `assets/js/carrito.js`

Este archivo maneja la lógica del carrito de compras.

Sus principales funciones son:

- Agregar productos al carrito.
- Guardar el carrito en `localStorage`.
- Obtener productos guardados.
- Eliminar productos del carrito.
- Vaciar el carrito.
- Calcular el total.
- Actualizar el contador del carrito en el menú.

El uso de `localStorage` permite simular persistencia de datos sin utilizar base de datos.

---

### `assets/js/auth.js`

Este archivo maneja la lógica de login y registro.

Sus principales funciones son:

- Registrar usuarios.
- Guardar datos básicos en `localStorage`.
- Validar inicio de sesión.
- Simular una sesión de usuario.
- Mostrar mensajes de error o confirmación.

Este sistema es básico y académico, por lo que no debe considerarse seguro para un sistema real.

---

### `assets/js/main.js`

Este archivo contiene funciones generales del sitio.

Puede usarse para:

- Inicializar funciones comunes.
- Actualizar elementos generales.
- Manejar mensajes visuales.
- Ejecutar funciones que se repiten en varias páginas.

---

## Explicación del CSS

### `assets/css/styles.css`

Este archivo contiene todos los estilos personalizados del proyecto.

Incluye estilos para:

- Colores principales.
- Tipografías.
- Navbar.
- Botones.
- Banner principal.
- Tarjetas de productos.
- Página de detalle.
- Formularios.
- Carrito.
- Footer.
- Diseño responsive.

El CSS utiliza una identidad visual relacionada con una pastelería, usando colores cálidos como café, crema, rosado suave y tonos claros.

Ejemplo de colores utilizados:

```css
:root {
  --color-primary: #8B4513;
  --color-accent: #FFC0CB;
  --color-background: #FFF5E1;
  --color-text-main: #5D4037;
}
```

El uso de variables CSS permite mantener una paleta de colores consistente en todo el sitio.

---

## Funcionamiento del detalle dinámico

Una de las mejoras principales del proyecto es el uso de un detalle dinámico.

El enlace de un producto funciona así:

```html
<a href="detalle.html?id=torta-chocolate">Ver detalle</a>
```

Luego, en `detalle.js`, JavaScript obtiene el valor del `id`:

```javascript
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");
```

Después busca el producto dentro del arreglo:

```javascript
const producto = productos.find(item => item.id === idProducto);
```

Finalmente, si encuentra el producto, rellena la información en el HTML:

```javascript
document.getElementById("detalleNombre").textContent = producto.nombre;
document.getElementById("detallePrecio").textContent = `$${producto.precio.toLocaleString("es-CL")}`;
document.getElementById("detalleImagen").src = producto.imagen;
```

Esto permite que el mismo archivo `detalle.html` sirva para todos los productos.

---

## Funcionamiento del carrito

El carrito funciona utilizando `localStorage`.

Cuando el usuario presiona el botón **Agregar al carrito**, JavaScript guarda el producto seleccionado en el navegador.

Ejemplo general:

```javascript
localStorage.setItem("carrito", JSON.stringify(carrito));
```

Para recuperar los productos guardados:

```javascript
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
```

Esto permite que el carrito siga funcionando aunque el usuario cambie de página o recargue el navegador.

---

## Cómo ejecutar el proyecto

Para ejecutar el proyecto correctamente:

1. Descargar o clonar el proyecto.
2. Abrir la carpeta del proyecto en **Visual Studio Code**.
3. Instalar la extensión **Live Server**, si no está instalada.
4. Hacer clic derecho sobre `index.html`.
5. Seleccionar **Open with Live Server**.
6. Navegar por el sitio desde el navegador.

También se puede abrir el archivo `index.html` directamente en el navegador, pero se recomienda usar **Live Server** para evitar problemas de rutas o carga de archivos.

---

## Flujo de uso del sitio

El flujo normal de uso del sitio es:

1. El usuario entra a `index.html`.
2. Desde el menú accede a `productos.html`.
3. Revisa el catálogo.
4. Usa el buscador o filtro si lo necesita.
5. Presiona **Ver detalle** en un producto.
6. Se abre `detalle.html` con la información del producto seleccionado.
7. El usuario elige cantidad.
8. Agrega el producto al carrito.
9. Entra a `carrito.html`.
10. Revisa el resumen de compra.

---

## Buenas prácticas aplicadas

En el proyecto se aplicaron buenas prácticas como:

- Separación de archivos HTML, CSS y JavaScript.
- Uso de carpetas para organizar recursos.
- Uso de etiquetas semánticas como `header`, `main`, `section`, `article` y `footer`.
- Uso de una sola página dinámica para el detalle de productos.
- Uso de JavaScript para evitar repetir contenido.
- Diseño responsive para adaptarse a distintos dispositivos.
- Uso de variables CSS para mantener colores consistentes.
- Uso de `localStorage` para simular persistencia de datos.
- Código más limpio y fácil de mantener.

---

## Mejoras realizadas al proyecto

Entre las mejoras aplicadas se encuentran:

- Reorganización de la estructura del proyecto.
- Creación de un catálogo dinámico.
- Reemplazo de múltiples páginas de detalle por una sola página dinámica.
- Mejora visual del detalle de producto para parecer una página de venta real.
- Corrección de rutas de imágenes y enlaces.
- Corrección del footer para mantenerse en la parte inferior.
- Mejora de tarjetas de productos.
- Implementación de búsqueda y filtros.
- Implementación de carrito con contador.
- Mejora del diseño responsive.

---

## Limitaciones del proyecto

Este proyecto es académico, por lo que tiene algunas limitaciones:

- No utiliza una base de datos real.
- No tiene backend.
- El login y registro son simulados.
- El carrito se guarda solo en el navegador del usuario.
- No realiza pagos reales.
- No tiene sistema real de despacho o gestión de pedidos.

Estas limitaciones son normales para un proyecto enfocado en HTML, CSS y JavaScript básico.

---

## Posibles mejoras futuras

En el futuro, el proyecto podría mejorarse agregando:

- Base de datos para productos y usuarios.
- Backend con Java, Spring Boot, Node.js u otra tecnología.
- Sistema real de autenticación.
- Panel de administración funcional.
- Sistema de pedidos.
- Pasarela de pago real.
- Historial de compras.
- Confirmación por correo electrónico.
- Integración con una API.
- Validaciones más avanzadas.
- Mejoras de accesibilidad.

---

## Aprendizaje obtenido

Este proyecto permitió reforzar conocimientos importantes del desarrollo web, tales como:

- Crear páginas usando HTML semántico.
- Aplicar estilos personalizados con CSS.
- Usar Bootstrap para apoyar el diseño responsive.
- Manipular el DOM con JavaScript.
- Trabajar con arreglos de objetos.
- Crear contenido dinámico.
- Leer parámetros desde la URL.
- Guardar datos en `localStorage`.
- Separar responsabilidades entre archivos.
- Mejorar la presentación visual de una página web.

---

## Estado del proyecto

El proyecto se encuentra funcional como una tienda online simulada para una pastelería.

Cumple con los objetivos académicos de practicar HTML, CSS y JavaScript, además de incorporar una estructura más ordenada y una experiencia de usuario más cercana a una página web real.

---

## Autor

Proyecto desarrollado con fines académicos para el ramo **Fullstack II**.

**Nombre del proyecto:** Mil Sabores  
**Tipo de proyecto:** Sitio web de pastelería  
**Tecnologías principales:** HTML, CSS y JavaScript  