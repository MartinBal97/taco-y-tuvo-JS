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
            //cafePequenio.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 1", JSON.stringify(cafePequenio)); // Lo guardo en local storage
            break;
        case "2":
            let cafeMediano = new Alimentos("Cafe mediano", 140, "Café o café con leche.");
            alimentos.push(cafeMediano);
            //cafeMediano.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 2", JSON.stringify(cafeMediano));
            break;
        case "3":
            let cafeGrande = new Alimentos("Cafe grande", 160, "Café o café con leche.");
            alimentos.push(cafeGrande);
            //cafeGrande.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 3", JSON.stringify(cafeGrande));
            break;
        case "4":
            let cafeIrlandes = new Alimentos("Cafe irlandes", 300, "Café con whisky");
            alimentos.push(cafeIrlandes);
            //cafeIrlandes.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 4", JSON.stringify(cafeIrlandes));
            break;
        case "5":
            let submarino = new Alimentos("Submarino", 340, "Barra de chocolate dentro de una taza de leche caliente");
            alimentos.push(submarino);
            //submarino.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 5", JSON.stringify(submarino));
            break;
        case "6":
            let capuchino = new Alimentos("Capuchino", 240, ""); // Creo objeto
            alimentos.push(capuchino); // Lo agrego a array
            //capuchino.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 6", JSON.stringify(capuchino)); // Lo guardo en local storage
            break;
        case "7":
            let tortitas = new Alimentos("Tortitas", 40, "");
            alimentos.push(tortitas);
            //tortitas.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 7", JSON.stringify(tortitas));
            break;
        case "8":
            let facturasMedialunas = new Alimentos("Facturas o Medialunas", 60, "");
            alimentos.push(facturasMedialunas);
            //facturasMedialunas.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 8", JSON.stringify(facturasMedialunas));
            break;
        case "9":
            let tostados = new Alimentos("Tostados", 290, "");
            alimentos.push(tostados);
            //tostados.verInformacion();
            precioFinal();
            localStorage.setItem("Objeto 9", JSON.stringify(tostados));
            break;
        case "10":
            let churrosChurrico = new Alimentos("Churros Churrico", 300, "");
            alimentos.push(churrosChurrico);
            //churrosChurrico.verInformacion();
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

        productosElegidos += "\n - " + alimentos[i].nombre + "  $" + alimentos[i].precio +'<br>';
        precioTotal += alimentos[i].precio;
    }

    let htmlLista = `
    <h3>Pedido: </h3>
    <div id="listaDeJS">
    ${productosElegidos} 
    </div>`;

    let htmlResumen = `
    <h3>Resumen: </h3>
    <div id="precioDeJS">
    <p> Efectivo o débito: <span> $${precioTotal} </span> </p>  <br>
    <p> Tarjeta de crédito(+20%):<span> $${precioTotal * 1.20 }</span> </p>
    </div>`;

    $(".listaCompras").empty().append(htmlLista);
    $(".resumen").empty().append(htmlResumen);
   
}

function llamarMozo() {
    alert("El mozo ha sido notificado, en segundos se acercará a su mesa.")
}

function cancelarPedido() {
    if (alimentos.length == 0) {
        alert("ATENCIÓN: Todavía no ha realizado ningún pedido.");
    } else {
        alert("PEDIDO CANCELADO");
        alimentos.splice(0, alimentos.length + 1);
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
    }

}

function realizarPedido() {
    if (alimentos.length == 0) {
        alert("ATENCIÓN: Todavía no ha realizado ningún pedido.");
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
    } else {
        alert("Su pedido ha sido recibido.")
    }
}

function borrarPedido() {
    if (alimentos.length == 0) {
        alert("ATENCIÓN: Todavía no ha realizado ningún pedido.");
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
    } else {
        alimentos.pop();
        precioFinal();
    }
}

document.querySelector("#realizar_pedido").addEventListener("click", realizarPedido);
document.querySelector("#cancelar_pedido").addEventListener("click", cancelarPedido);
document.querySelector("#llamar_mozo").addEventListener("click", llamarMozo)
document.querySelector("#borrar_pedido").addEventListener("click", borrarPedido)




















/*
 function mostrarArreglo() {
     alimentos.sort(function (a, b) {
         return (b.precio - a.precio)
     });

     console.table(alimentos);
 }

 mostrarArreglo();*/



/*
    const contenedorComidas = document.querySelector(".contenedorComidas");

    for (var i = 0; i < contenedorComidas.length; i++) {
        contenedorComidas[i].addEventListener('click', tomarPedido);

    }*/