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
        localStorage.removeItem("carrito");
        localStorage.removeItem("total");
        cliente = false;
        carrito = [];
        total = 0;
        btnCliente.textContent = "Iniciar sesion";
        Swal.fire({
            text: "¡Gracias por su visita!",
            background: "#222",
            color: "#fff",
            confirmButtonColor: "#1f2b3d",
            icon: "success"
        });
        const resumen = document.getElementById("resumenCarrito");
        if (resumen) resumen.style.display = "none";
    }
});

// Evento del botón Ingresar
document.getElementById("btnIngresar").addEventListener("click", () => {
    const nombre = document.getElementById("nombreCliente").value.trim();
    const dni = document.getElementById("dniCliente").value.trim();

    if (!nombre || !dni) {
        Swal.fire({
            text: "¡Por favor completar campos!",
            background: "#222",
            color: "#fff",
            confirmButtonColor: "#1f2b3d",
            icon: "warning"
        });
        return;
    }

    // Validar que el DNI tenga exactamente 8 dígitos numéricos
    const dniValido = /^\d{8}$/.test(dni);
    if (!dniValido) {
        Swal.fire({
            text: "El DNI debe tener exactamente 8 dígitos numéricos.",
            background: "#222",
            color: "#fff",
            confirmButtonColor: "#1f2b3d",
            icon: "error"
        });
        return;
    }

    const usuario = { nombre, dni };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    cliente = true;
    formularioLogin.style.display = "none";
    btnCliente.textContent = "Cerrar sesión";
});

// Lista de productos
let productos = [];

fetch("../data/products.json")
    .then(respuesta => respuesta.json())
    .then(data => {
        productos = data;
        renderizarProductos();
    })
    .catch(error => {
        console.error("Error al cargar los productos:", error);
    });

// Cargar carrito desde localStorage
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
        articulo.classList.add("card");
        articulo.innerHTML = `
            <img src="${producto.imgUrl}" alt="Logo de la marca" class="logoNav">
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
        boton.addEventListener("click", (a) => {
            const id = parseInt(a.target.getAttribute("data-id"));
            agregarAlCarrito(id);
        });
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    if (cliente != false) {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            carrito.push(producto);
            total += producto.precio;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("total", total.toString());

            actualizarResumenCarrito();
        }
    } else {
        Swal.fire({
            text: "¡Es necesario Iniciar sesion!",
            background: "#222",
            color: "#fff",
            confirmButtonColor: "#1f2b3d",
            icon: "success"
        });;
    }
}

// Mostrar resumen del carrito en pantalla
function actualizarResumenCarrito() {
    let resumen = document.getElementById("resumenCarrito");

    if (!resumen) {
        resumen = document.createElement("section");
        resumen.id = "resumenCarrito";
        resumen.style.backgroundColor = "#6b6980"
        resumen.style.border = "2px solid black";
        resumen.style.width = "35%";
        resumen.style.margin = "20px auto";
        resumen.style.padding = "10px"
        resumen.style.borderRadius = "10px";
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
        <button id="finalizarCompra">Finalizar compra</button>
    `;
    const finalizarCompra = document.getElementById("finalizarCompra");
    finalizarCompra.addEventListener("click", () => {
        window.location.href = "pages/finalizacion.html"
            ;
    });
}
// Funciones a boton carrito y finalizar compra 
const btnCarrito = document.getElementById("btnCarrito");
btnCarrito.addEventListener("click", () => {
    if (!cliente) {
        Swal.fire({
            text: "¡Es necesario inicair sesion!",
            background: "#222",
            color: "#fff",
            confirmButtonColor: "#1f2b3d",
            icon: "warning"
        }).then(() => {
            window.location.href = "../index.html";
        });
    }else{
    window.location.href = "pages/finalizacion.html";
    }
});