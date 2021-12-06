    class Alimentos {
        constructor(nombre, precio, descripcion) {
            this.nombre = nombre;
            this.precio = precio;
            this.descripcion = descripcion;
        }
    }

    const produtosCafeteria = [{
            nombre: "Cafe pequeño",
            precio: 90,
            descripcion: "Café o café con leche."
        },
        {
            nombre: "Cafe mediano",
            precio: 140,
            descripcion: "Café o café con leche."
        },
        {
            nombre: "Cafe grande",
            precio: 160,
            descripcion: "Café o café con leche."
        },
        {
            nombre: "Cafe irlandes",
            precio: 300,
            descripcion: "Café con whisky"
        },
        {
            nombre: "Submarino",
            precio: 340,
            descripcion: "Barra de chocolate dentro de una taza de leche caliente"
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
    $("#promociones").click(function () {

      $.get("js/promos.json", function (respuesta, estado) {
            if (estado === "success"){
               
                let promoCafe1 = {nombre: "PROMO Café 1",descripcion: "Café grande más 2 medialunas o tortitas.", precio: 250};
                let promoCafe2 = {nombre: "PROMO Café 2",descripcion: "Café mediano más 2 medialunas o tortitas.", precio: 200};
                let promoTostado = {nombre: "PROMO TOSTADO",descripcion:"Café mediano más totado de miga", precio: 400};
                let promoChurros = {nombre: "PROMO CHURROS",descripcion: "Café o chocolate grande más 2 churros.", precio: 300};

                produtosCafeteria.push(promoCafe1);
                produtosCafeteria.push(promoCafe2);
                produtosCafeteria.push(promoTostado);
                produtosCafeteria.push(promoChurros);

              for (const dato of respuesta) {
                cont += 1;
                $("#contenedorDePromos").append(`
                <div id="${cont}" onClick="tomarPedido(this.id)" class="contenedorPromo">
                <h3 class="nombrePromo">${dato.nombre}</h3>
                <p class="contenidoPromo">${dato.descripcion}</p>
               
                <div class="flex">
                    <p> </p>
                    <p class="precioPromo">$${dato.precio}</p>
                </div>
            </div>`);
              }  
          } else {
            Swal.fire('Hoy no hay promociones disponibles')
          } 

    });
});
    
 // AGREGANDO TODOS LOS PEDIDOS AL HTML

    var cont = -1;
    for (let i = 0; i < produtosCafeteria.length; i++) {
        cont += 1;
        var nombreProduct = produtosCafeteria[i].nombre;
        var precioProduct = produtosCafeteria[i].precio;
        var descripcionProduct = produtosCafeteria[i].descripcion;

        $("#contenedorDeComidas").append(` <div id="${cont}" onClick="tomarPedido(this.id)" class="contenedorComidas">
                                                <div class="platoEingredientes">
                                                    <p class="nombrePlato">${nombreProduct}</p>
                                                    <p class="contenidoIngredientes">${descripcionProduct}</p>
                                                </div>
                                                <p class="precios">$${precioProduct}</p>
                                            </div>`);
    }

  /*  function cantidadDePedidos() {

        const ipAPI = '//api.ipify.org?format=json'

        const inputValue = fetch(ipAPI)
            .then(response => response.json())
            .then(data => data.ip)

        const {
            value: ipAddress
        } = Swal.fire({
            title: 'Coloque la cantidad de este pedido',
            input: 'number',

            inputValue: 0,
            showCancelButton: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'Tenes que poner un número!'
                }
            }
        })

        if (ipAddress) {
            Swal.fire(`Your IP address is ${ipAddress}`)
        }
    }*/

    // TOMANDO PEDIDOS
    function tomarPedido(id) {
        carrito.push(produtosCafeteria[id]); // Lo agrego a array carrito
        precioFinal();
    }

    const carrito = [];

    function precioFinal() {
        let productosElegidos = "";
        var precioTotal = 0;

        for (let i = 0; i < carrito.length; i++) {
            productosElegidos += "\n - " + carrito[i].nombre + "  $" + carrito[i].precio + '<br>';
            precioTotal += carrito[i].precio;
        }

        $(".listaCompras").empty().append(`<div id="listaDeJS">
                                            <h3>Pedido: </h3>
                                            <p>${productosElegidos}</p>  
                                           </div>`);
        $(".resumen").empty().append(`<div id="precioDeJS">
                                        <h3>Resumen: </h3>
                                            <p> Efectivo o débito: <br> <span> $${precioTotal} </span> </p>  <br>
                                            <p> Tarjeta de crédito(+20%): <br> <span> $${precioTotal * 1.20}</span> </p>
                                    </div>`);

        $("#cantProductos").empty().prepend(carrito.length); // contador carrito
    }

    // FUNCION BOTON LLAMAR AL MOZO
    $("#llamar_mozo").click(function () {
        Swal.fire('El mozo ha sido notificado, en segundos se acercará a su mesa.')
        //cantidadDePedidos();
    });
    // FUNCION BOTON REALIZAR PEDIDO
    $("#realizar_pedido").click(function realizarPedido() {
        var numMesa = $("#mesas").value;
        console.log(numMesa);

        if (carrito.length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todavía no ha realizado ningún pedido.'
            })
            $('#muestra .listaCompras #listaDeJS').empty();
            $('#muestra .resumen #precioDeJS').empty();
        } else {
            Swal.fire({
                title: 'Confirmar pedido',
                text: "Una vez que confirme empezaremos a preparar su pedido!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar !'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Pedido realizado!',
                        'Su pedido está en preparación.',
                        'success'
                    )
                }
            })


            $('#muestra .listaCompras #listaDeJS').empty();
            $('#muestra .resumen #precioDeJS').empty();
            carrito.splice(0, carrito.length + 1);
            $("#cantProductos").empty().prepend(carrito.length); // contador carrito
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
            $("#cantProductos").empty().prepend(carrito.length); // contador carrito
        }
    });











/*
 function mostrarArreglo() {
     carrito.sort(function (a, b) {
         return (b.precio - a.precio)
     });

     console.table(carrito);
 } */