class Alimentos {
    constructor(nombre, precio, descripcion) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
    verInformacion() {
        alert(`Este es un ${this.nombre}, su precio es de $${this.precio} y su descripcion es: ${this.descripcion}`);
    }

}

function tomarPedido(id) {
    switch (id) {
        case "1":
            let cafePequenio = new Alimentos("Cafe pequeño", 90, "Café o café con leche."); // Creo objeto
            alimentos.push(cafePequenio); // Lo agrego a array
            precioFinal();
            localStorage.setItem("Objeto 1", JSON.stringify(cafePequenio)); // Lo guardo en local storage
            break;
        case "2":
            let cafeMediano = new Alimentos("Cafe mediano", 140, "Café o café con leche.");
            alimentos.push(cafeMediano);
            precioFinal();
            localStorage.setItem("Objeto 2", JSON.stringify(cafeMediano));
            break;
        case "3":
            let cafeGrande = new Alimentos("Cafe grande", 160, "Café o café con leche.");
            alimentos.push(cafeGrande);
            precioFinal();
            localStorage.setItem("Objeto 3", JSON.stringify(cafeGrande));
            break;
        case "4":
            let cafeIrlandes = new Alimentos("Cafe irlandes", 300, "Café con whisky");
            alimentos.push(cafeIrlandes);
            precioFinal();
            localStorage.setItem("Objeto 4", JSON.stringify(cafeIrlandes));
            break;
        case "5":
            let submarino = new Alimentos("Submarino", 340, "Barra de chocolate dentro de una taza de leche caliente");
            alimentos.push(submarino);
            precioFinal();
            localStorage.setItem("Objeto 5", JSON.stringify(submarino));
            break;
        case "6":
            let capuchino = new Alimentos("Capuchino", 240, "");
            alimentos.push(capuchino);
            precioFinal();
            localStorage.setItem("Objeto 6", JSON.stringify(capuchino));
            break;
        case "7":
            let tortitas = new Alimentos("Tortitas", 40, "");
            alimentos.push(tortitas);
            precioFinal();
            localStorage.setItem("Objeto 7", JSON.stringify(tortitas));
            break;
        case "8":
            let facturasMedialunas = new Alimentos("Facturas o Medialunas", 60, "");
            alimentos.push(facturasMedialunas);
            precioFinal();
            localStorage.setItem("Objeto 8", JSON.stringify(facturasMedialunas));
            break;
        case "9":
            let tostados = new Alimentos("Tostados", 290, "");
            alimentos.push(tostados);
            precioFinal();
            localStorage.setItem("Objeto 9", JSON.stringify(tostados));
            break;
        case "10":
            let churrosChurrico = new Alimentos("Churros Churrico", 80, "");
            alimentos.push(churrosChurrico);
            precioFinal();
            localStorage.setItem("Objeto 10", JSON.stringify(churrosChurrico));
            break;
    }
}
const alimentos = [];


function precioFinal() {

    let productosElegidos = "";
    var precioTotal = 0;

    for (let i = 0; i < alimentos.length; i++) {

        productosElegidos += "\n - " + alimentos[i].nombre + "  $" + alimentos[i].precio + '<br>';
        precioTotal += alimentos[i].precio;

    }

    let htmlLista = `
    <div id="listaDeJS">
    <h3>Pedido: </h3>
      <p>${productosElegidos}</p>  
    </div>`;
    let htmlResumen = `
    <div id="precioDeJS">
    <h3>Resumen: </h3>
        <p> Efectivo o débito: <br> <span> $${precioTotal} </span> </p>  <br>
        <p> Tarjeta de crédito(+20%): <br> <span> $${precioTotal * 1.20 }</span> </p>
    </div>`;

    $(".listaCompras").empty().append(htmlLista);
    $(".resumen").empty().append(htmlResumen);
    $("#cantProductos").empty().prepend(alimentos.length); // contador carrito
}


// FUNCION BOTON LLAMAR AL MOZO, usando shorcut sin dar nombre a la funcion
$("#llamar_mozo").click(function () {
    alert("El mozo ha sido notificado, en segundos se acercará a su mesa.")
});
// FUNCION BOTON REALIZAR PEDIDO, usando shorcut dando nombre a la funcion
$("#realizar_pedido").click(function realizarPedido() {
    if (alimentos.length == 0) {
        alert("ATENCIÓN: Todavía no ha realizado ningún pedido.");
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
    } else {
        alert("Su pedido ha sido recibido.")
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
        alimentos.splice(0, alimentos.length + 1);
        $("#cantProductos").empty().prepend(alimentos.length); // contador carrito
    }
});
// FUNCION BOTON BORRAR ULTIMO PEDIDO, con arrow function
$("#borrar_pedido").click(() => {
    if (alimentos.length == 0) {
        alert("ATENCIÓN: Todavía no ha realizado ningún pedido.");
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
    } else {
        alimentos.pop();
        precioFinal();
    }
});
// FUNCION BOTON CANCELAR PEDIDO
$("#cancelar_pedido").on("click", function cancelarPedido() {
    if (alimentos.length == 0) {
        alert("ATENCIÓN: Todavía no ha realizado ningún pedido.");
    } else {
        alert("PEDIDO CANCELADO");
        alimentos.splice(0, alimentos.length + 1);
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
        $("#cantProductos").empty().prepend(alimentos.length); // contador carrito
    }
});
// FUNCION PARA MOVER FLECHA CADA VEZ QUE SE HACE CLICK
var grados = 0;
$(".contenedor-padre").click(() => {
    grados += 180;
    $("#flechaAbajo").css({
        "transform": "rotateX(" + grados + "deg)",
        "transition": "0.5s"
    });
    $("#slide").toggle("slow");
});








/*
$("#app").append(`<header>
                    <div class = "contenedorTitulo">
                        <h2> Cafetería </h2>
                    </div>
                </header>`);
*/













/*
 function mostrarArreglo() {
     alimentos.sort(function (a, b) {
         return (b.precio - a.precio)
     });

     console.table(alimentos);
 }

 mostrarArreglo();*/