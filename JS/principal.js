let cliente = false;
let DNI;
let seleccion;
let total = 0;
let carrito = [];
let usuario;

usuario = JSON.parse(localStorage.getItem("usuario"));
const btnCliente = document.getElementById("btnCliente");
const formularioLogin = document.getElementById("formularioLogin");

if (usuario) {
    cliente = true;
    btnCliente.textContent = "Cerrar sesión";
}

// Evento del botón Cliente
btnCliente.addEventListener("click", () => {
    if (!cliente) {
        formularioLogin.style.display = "block";
    } else {
        localStorage.removeItem("usuario");
        cliente = false;
        btnCliente.textContent = "Cliente";
        alert("Sesión cerrada.");
    }
});

// Evento del botón Ingresar
document.getElementById("btnIngresar").addEventListener("click", () => {
    const nombre = document.getElementById("nombreCliente").value.trim();
    const dni = document.getElementById("dniCliente").value.trim();

    if (nombre && dni) {
        const usuario = { nombre, dni };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        cliente = true;
        formularioLogin.style.display = "none";
        btnCliente.textContent = "Cerrar sesión";
    } else {
        alert("Por favor completá todos los campos.");
    }
});

// Lista de productos
const productos = [
    { id: 1, nombre: "Proteína Whey", precio: 15000 },
    { id: 2, nombre: "Creatina", precio: 10000 },
    { id: 3, nombre: "Pre-entreno", precio: 8000 },
    { id: 4, nombre: "BCAA", precio: 9000 }
];

// Cargar carrito desde localStorage si existe
const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
const totalGuardado = parseInt(localStorage.getItem("total"));
if (carritoGuardado) carrito = carritoGuardado;
if (totalGuardado) total = totalGuardado;

// Inyectar productos al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    renderizarProductos();
    actualizarResumenCarrito();
});

// Render de productos
function renderizarProductos() {
    const contenedor = document.getElementById("contenedor-productos");

    productos.forEach(producto => {
        const articulo = document.createElement("article");
        articulo.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <button class="btnComprar" data-id="${producto.id}">Comprar</button>
        `;
        contenedor.appendChild(articulo);
    });

    agregarEventosBotones();
}

// Agregar eventos a botones "Comprar"
function agregarEventosBotones() {
    const botones = document.querySelectorAll(".btnComprar");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        total += producto.precio;

        // Guardar en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("total", total.toString());

        actualizarResumenCarrito();
    }
}

// Mostrar resumen del carrito en pantalla
function actualizarResumenCarrito() {
    let resumen = document.getElementById("resumenCarrito");

    // Si no existe, lo creamos
    if (!resumen) {
        resumen = document.createElement("section");
        resumen.id = "resumenCarrito";
        resumen.style.borderTop = "2px solid black";
        resumen.style.marginTop = "20px";
        document.querySelector("main").appendChild(resumen);
    }

    if (carrito.length === 0) {
        resumen.innerHTML = "<p>Carrito vacío.</p>";
        return;
    }

    resumen.innerHTML = `
        <h3>Resumen del carrito</h3>
        <ul>
            ${carrito.map(item => `<li>${item.nombre} - $${item.precio}</li>`).join("")}
        </ul>
        <p><strong>Total: $${total}</strong></p>
    `;
}