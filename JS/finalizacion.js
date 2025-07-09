window.addEventListener("DOMContentLoaded",() =>{
    const compraFinal =document.getElementById("compraFinal");

    const carrito = JSON.parse(localStorage.getItem("carrito"))||[];
    const total = parseInt(localStorage.getItem("total"))||0;

    if (carrito.length ===0) {
        compraFinal.innerHTML = "<p>Tu carrito esta vacio!</p>";
        return;
    }
    compraFinal.innerHTML = `
    <p>Total a pagar: $${total}
    `;
})