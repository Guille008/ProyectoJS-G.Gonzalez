let Nombre;
let DNI;
let Seleccion;
let total = 0;
let Carrito = [];

Nombre = prompt("Bienvenido a Calzados sport!\nPor favor ingrese su nombre completo");
while (Nombre === null || !isNaN(Nombre)) {
    Nombre = prompt("Entrada invalida. Por favor ingrese su nombre");
}
DNI =prompt("Gracias por visitar nuestro sitio "+Nombre+"\nPor favor ingrese su nuemero de DNI");
    if (DNI !== null && !isNaN(DNI)){
        console.log("Gracias por su visita "+Nombre);
        
    } else {
        console.log("necesita ingresar un numero")
    }

const productosArr = [];

productosArr.push({ Producto: "Zapatilla 1", Precio: 2000 });
productosArr.push({ Producto: "Zapatilla 2", Precio: 3000 });
productosArr.push({ Producto: "Zapatilla 3", Precio: 3500 });

let mensaje = "Seleccione la opcion deseada \n";
for (let i = 0; i < productosArr.length; i++) {
    mensaje += (i + 1) + " - " + productosArr[i].Producto + " ($" + productosArr[i].Precio + ")\n";
}

mensaje += "Escriba 'salir' para finalizar.";

do {
    opcion = prompt(mensaje);
    if (opcion === "salir") {
        break;
    }

    let index = parseInt(opcion) - 1;

    if (!isNaN(index) && index >= 0 && index < productosArr.length) {
        total += productosArr[index].Precio;
        Carrito.push(productosArr[index].Producto);
        alert("Producto agregado " + productosArr[index].Producto);
    } else {
        alert("Opcion Invalida. Por favor vuelva a ingresar.");
    }
} while(true);
console.log("Resumen de su compra \n" +Nombre+ " DNI: "+DNI);
console.log("Carrito Final " + Carrito.join(", "));
console.log("Total a pagar: $" +total);






