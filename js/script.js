class Alimentos {
    constructor(nombre, precio, descripcion) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

const produtosCafeteria = [{
        nombre: "Café pequeño",
        precio: 90,
        descripcion: "Café o café con leche."
    },
    {
        nombre: "Café mediano",
        precio: 140,
        descripcion: "Café o café con leche."
    },
    {
        nombre: "Café grande",
        precio: 160,
        descripcion: "Café o café con leche."
    },
    {
        nombre: "Café irlandes",
        precio: 300,
        descripcion: "Café con whisky."
    },
    {
        nombre: "Submarino",
        precio: 340,
        descripcion: "Barra de chocolate dentro de una taza de leche caliente."
    },
    {
        nombre: "Capuchino",
        precio: 240,
        descripcion: ""
    },
    {
        nombre: "Tortitas",
        precio: 40,
        descripcion: ""
    },
    {
        nombre: "Facturas o Medialunas",
        precio: 60,
        descripcion: ""
    },
    {
        nombre: "Tostados",
        precio: 290,
        descripcion: ""
    },
    {
        nombre: "Churros Churrico",
        precio: 80,
        descripcion: ""
    }
];

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

// AGREGANDO TODOS LOS PEDIDOS AL HTML con los datos de JSON
var cont = -1;
var cont2 = 0;
$("#promociones").click(function () {
    $.get("js/promos.json", function (promos, estado) {
        if (estado === "success") {

            for (let i = 0; i < promos.length; i++) {
                produtosCafeteria.push({ nombre: promos[i].nombre, descripcion: promos[i].descripcion, precio: promos[i].precio });
            }

            if (cont2 == 0) {
                for (const promo of promos) {
                    cont += 1;
                    $("#contenedorDePromos").append(`<div id="${cont}" onClick="tomarPedido(this.id)" class="contenedorPromo">
                                            <h3 class="nombrePromo">${promo.nombre}</h3>
                                            <p class="contenidoPromo">${promo.descripcion}</p>
                                            <div class="flex">
                                                <p> </p>
                                                <p class="precioPromo">$${promo.precio}</p>
                                            </div>
                                      </div>`);
                }
            }
        } else {
            Swal.fire('Hoy no hay promociones disponibles')
        }
        cont2 += 1;
    });
});

// AGREGANDO TODOS LOS PEDIDOS AL HTML
var cont = -1;
for (let i = 0; i < produtosCafeteria.length; i++) {
    cont += 1;
    $("#contenedorDeComidas").append(` <div id="${cont}" onClick="tomarPedido(this.id)" class="contenedorComidas">
                                                <div class="platoEingredientes">
                                                    <p class="nombrePlato">${produtosCafeteria[i].nombre}</p>
                                                    <p class="contenidoIngredientes">${produtosCafeteria[i].descripcion}</p>
                                                </div>
                                                <p class="precios">$${produtosCafeteria[i].precio}</p>
                                            </div>`);
}
// SE AGREGA AL CARRITO EL PRODUCTO SELECCIONADO DE ACUERDO A SU ID Y SE LLAMA A LA FUNCION precioFinal()
function tomarPedido(id) {
    carrito.push(produtosCafeteria[id]);
    precioFinal();
}
// FUNCION PARA VISUALIZAR LA CANTIDAD DE PEDIDOS EN EL CARRITO
function numeroDePedidos() {
    if (carrito.length > 9) {
        $("#cantProductos").empty().append("+9");
    } else {
        $("#cantProductos").empty().append(carrito.length);
    }
}

var carrito = [];
// FUNCION AGREGAR EL RESUMEN T EL PRECIO DE LOS PEDIDOS QUE SE VAN REALIZANDO
function precioFinal() {
    let productosElegidos = "";
    var precioTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        productosElegidos += "\n - " + carrito[i].nombre + "  $" + carrito[i].precio + '<br>';
        precioTotal += carrito[i].precio;
    }

    $(".listaCompras").empty().append(` <div id="listaDeJS">
                                                <h3>Pedido: </h3>
                                                <p>${productosElegidos}</p>  
                                            </div>`);
    $(".resumen").empty().append(`<div id="precioDeJS">
                                        <h3>Resumen: </h3>
                                            <p> Efectivo o débito: <br> <span> $${precioTotal} </span> </p>  <br>
                                            <p> Tarjeta de crédito(+20%): <br> <span> $${precioTotal * 1.20}</span> </p>
                                    </div>`);
    numeroDePedidos();
}

// FUNCION BOTON LLAMAR AL MOZO
$("#llamar_mozo").click(function () {
    var numMesa = $("#mesas").val();

    if ((numMesa < 26) && (numMesa > 0)) {
        Swal.fire({
            icon: 'success',
            font: "10px",
            text: 'El mozo ha sido notificado, en segundos se acercará a su mesa.'
        })
    } else {
        Swal.fire({
            icon: 'question',
            font: "10px",
            text: 'El mozo no sabe cual es su mesa, coloque el número de mesa correspondiente.'
        })
    }
});
// FUNCION BOTON REALIZAR PEDIDO
$("#realizar_pedido").click(function realizarPedido() {
    var numMesa = $("#mesas").val();

    if ((numMesa < 26) && (numMesa > 0)) {
        if (carrito.length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todavía no ha realizado ningún pedido.'
            });

            $('#muestra .listaCompras #listaDeJS').empty();
            $('#muestra .resumen #precioDeJS').empty();
        } else {
            Swal.fire({
                title: 'Confirmar pedido',
                text: "Una vez que confirme empezaremos a preparar su pedido!",
                icon: 'warning',
                iconColor: '#d33',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                allowOutsideClick: false,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Confirmar !'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Pedido realizado!',
                        'Su pedido está en preparación.',
                        'success'
                    )
                    const enJSON = JSON.stringify(carrito);
                    localStorage.setItem("carrito", enJSON);

                    $('#muestra .listaCompras #listaDeJS').empty();
                    $('#muestra .resumen #precioDeJS').empty();
                    carrito.splice(0, carrito.length + 1);
                    numeroDePedidos();
                }
            })
        }
    } else {
        Swal.fire({
            font: "10px",
            text: 'Coloque su número de mesa correctamente antes de realizar su pedido'
        })
    }
});
// FUNCION BOTON BORRAR ULTIMO PEDIDO
$("#borrar_pedido").click(() => {
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todavía no ha realizado ningún pedido.'
        })
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
    } else {
        carrito.pop();
        precioFinal();
    }
});
// FUNCION BOTON CANCELAR PEDIDO
$("#cancelar_pedido").on("click", function cancelarPedido() {
    if (carrito.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todavía no ha realizado ningún pedido.'
        })
    } else {
        Swal.fire('PEDIDO CANCELADO')
        carrito.splice(0, carrito.length + 1);
        $('#muestra .listaCompras #listaDeJS').empty();
        $('#muestra .resumen #precioDeJS').empty();
        numeroDePedidos();
    }
});


// Si anteriormente el cliente ya ha realizado un pedido el siguiente codigo le ofrecerá realizar el mismo pedido que hizo esa vez
$( document ).ready(function() {
    if (localStorage.length > 0) {
        Swal.fire ({
            title: 'Hola de nuevo!',
            text: 'Notamos que ya nos has visitado anteriormente lo cual nos enorgullece que hayas decidido volver. ¿Querés agregar al carrito el último pedido que realizaste la ultima vez que nos visitaste?',
            grow: 'row',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            cancelButtonText: 'No me interesa',
            confirmButtonText: 'Buena idea !',
            backdrop: true,
            allowOutsideClick: true
        }).then((result) => {
            if (result.isConfirmed) {
                var ultimoPedidoRealizado = localStorage.getItem('carrito')
                carrito = JSON.parse(ultimoPedidoRealizado);
                precioFinal();
            }
        })
        
    }
});
