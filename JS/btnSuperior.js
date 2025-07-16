window.addEventListener("DOMContentLoaded", () => {
    const btnCliente = document.getElementById("btnCliente");
    const btnCarrito = document.getElementById("btnCarrito");

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const cliente = !!usuario;


    const enIndex = location.pathname.endsWith("index.html") || location.pathname === "/" || location.pathname === "/index.html";

    if (!cliente && !enIndex) {
        alert("Necesitás iniciar sesión para continuar");
        window.location.href = "../index.html";
        return;
    }


    if (btnCliente) {
        btnCliente.textContent = cliente ? "Cerrar sesión" : "Iniciar sesión";

        btnCliente.addEventListener("click", () => {
            if (cliente) {
                localStorage.clear();
                alert("Sesión cerrada. ¡Hasta la próxima!");
                window.location.href = "../index.html";
            } else {
                window.location.href = "../index.html";
            }
        });
    }


    if (btnCarrito) {
        btnCarrito.addEventListener("click", () => {
            if (cliente) {
                window.location.href = "./finalizacion.html";
            } else {
                alert("Iniciá sesión para ver tu carrito");
                window.location.href = "../index.html";
            }
        });
    }
});
console.log("contactos1234");