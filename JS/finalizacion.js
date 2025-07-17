window.addEventListener("DOMContentLoaded", () => {
    const compraFinal = document.getElementById("compraFinal");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = parseInt(localStorage.getItem("total")) || 0;
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const nombre = usuario.nombre;

    if (carrito.length === 0) {
        compraFinal.innerHTML = `<h1 class="carroVacio">¡Tu carrito está vacío!</h1>`;
        return;
    }

    compraFinal.innerHTML = `
    <article class="textFinal">
        <div class="infoAdicional">
            <h5>¿Por qué elegirnos?</h5>
            <ul>
                <li>✔️ Envíos rápidos a todo el país</li>
                <li>✔️ Pagos 100% seguros</li>
                <li>✔️ Atención personalizada</li>
                <li>✔️ Cambios sin cargo</li>
            </ul>
        </div>
        <h3>${nombre}, estás a un paso de recibir tu pedido!</h3>
        <h4>Total a pagar: $${total}</h4>
    </article>
    <article class="formFinal">
        <form class="formPago">
            <h2>Completa los campos para poder finalizar tu proceso de compra</h2>
            <input type="text" name="numeroTarjeta" placeholder="Número de tarjeta" required>
            <div class="fila">
                <input type="text" name="vencimiento" placeholder="Fecha de vencimiento (MM / AA)" required>
                <input type="text" name="codigoSeguridad" placeholder="Código de seguridad" required>
            </div>
            <input type="text" name="titular" placeholder="Nombre del titular" required>
            <div class="fila">
                <select name="tipoDocumento">
                    <option value="DNI">DNI</option>
                    <option value="CUIT">CUIT</option>
                    <option value="CI">CI</option>
                </select>
                <input type="text" name="numeroDocumento" placeholder="Número de documento" required>
            </div>
            <select name="cuotas" required>
                <option value="">Cuotas</option>
                <option value="1">1 cuota</option>
                <option value="3">3 cuotas</option>
                <option value="6">6 cuotas</option>
                <option value="12">12 cuotas</option>
            </select>
            <button id="pagar">Pagar ahora</button>
        </form>
    </article>
    `;

    const pagar = document.getElementById("pagar");
    pagar.addEventListener("click", (e) => {
        e.preventDefault();
        const formPago = document.querySelector(".formPago");
        const numeroTarjeta = formPago.numeroTarjeta.value.trim();
        const vencimiento = formPago.vencimiento.value.trim();
        const codigoSeguridad = formPago.codigoSeguridad.value.trim();
        const titular = formPago.titular.value.trim();
        const tipoDocumento = formPago.tipoDocumento.value.trim();
        const numeroDocumento = formPago.numeroDocumento.value.trim();
        const cuotas = formPago.cuotas.value.trim();
        if (
            !numeroTarjeta ||
            !vencimiento ||
            !codigoSeguridad ||
            !titular ||
            !tipoDocumento ||
            !numeroDocumento ||
            !cuotas
        ) {
            Swal.fire({
            icon: "warning",
            text: "Por favor, completá todos los campos antes de continuar.",
            background: "#222",
            color: "#fff",
            confirmButtonColor: "#1f2b3d"
            });
        return;
        } else{

        Swal.fire({
                title: "¡Gracias por tu compra!",
                text: "En breve recibirás un correo con el resumen de tu pedido.",
                icon: "success",
                confirmButtonText: "Volver al inicio"
            }).then(() => {
                localStorage.removeItem("carrito");
                localStorage.removeItem("total");
                localStorage.removeItem("usuario");
                window.location.href = "../index.html";
            });
        }
        });
});
